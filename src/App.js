import React, { Component } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ShowOTP from "./components/senderView/ShowOTP";
import EnterOTP from "./components/receiverView/EnterOTP";
import streamSaver from "streamsaver";
import DataTransfer from "./components/connectedView/DataTransfer";
import Header from "./components/commonView/Header";
import LandingPage from "./components/commonView/LandingPage";
import AboutInfo from "./components/commonView/AboutInfo";

let peer = null;
const worker = new Worker("../worker.js");
console.log(worker);

//dev
// const socket = io("http://localhost:4000", {
//   transports: ["websocket"],
// });

//prod
const socket = io("https://swish-server-api.herokuapp.com/", {
  transports: ["websocket"],
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      my_sid: null,
      peer_sid: null,
      socketConnection: false,
      peerConnection: false,
      otp: null,
      initiator: false,
      wrongOTP: false,
      OTPaccepted: false,
      file: undefined,
    };
    this.checkApi = this.checkApi.bind(this);
    this.requestOTP = this.requestOTP.bind(this);
    this.pairPeers = this.pairPeers.bind(this);
    this.sendLink = this.sendLink.bind(this);
    this.callPeer = this.callPeer.bind(this);
    this.acceptCall = this.acceptCall.bind(this);
    this.handleReceivingData = this.handleReceivingData.bind(this);
    this.download = this.download.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.sendFile = this.sendFile.bind(this);
    this.initiator = this.initiator.bind(this);
    this.resetState = this.resetState.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.resetFile = this.resetFile.bind(this);
    this.resetWrongOTP = this.resetWrongOTP.bind(this);
  }

  callPeer(id) {
    peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
    });

    // sender peer instance
    console.log("Creating Peer instance", peer);

    peer.on("signal", (data) => {
      socket.emit("callPeer", {
        peerToCall: id,
        signalData: data,
        from: this.state.my_sid,
      });
    });

    peer.on("error", (error) => {
      console.log(error);
      // this.setState({
      //   peerConnection: false,
      // });
    });

    socket.on("callAccepted", (signal) => {
      console.log("Call accepted, peer connection established");
      this.setState({
        peerConnection: true,
      });
      peer.signal(signal);

      peer.on("data", (data) => {
        // message part
        // let string = new TextDecoder("utf-8").decode(data);
        // console.log(string);

        // file part
        // console.log(data);
        this.handleReceivingData(data);
      });

      peer.on("close", () => {
        console.log("peer connection closed");
        this.setState({
          peerConnection: false,
        });
      });
    });
  }

  acceptCall(callerData) {
    peer = new Peer({
      initiator: false,
      trickle: false,
      // stream: stream,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
    });

    // receiver peer instance
    console.log("Creating Peer instance", peer);

    peer.on("signal", (data) => {
      //breaking here
      socket.emit("acceptCall", { signal: data, to: this.state.peer_sid });
      console.log("Call accepted, peer connection established");
    });

    peer.on("error", (error) => {
      console.log(error);
      // this.setState({
      //   peerConnection: false,
      // });
    });

    peer.on("data", (data) => {
      //message part
      // let string = new TextDecoder("utf-8").decode(data);
      // console.log(string);

      // file part
      // console.log(typeof data, data);
      this.handleReceivingData(data);
    });

    peer.on("close", () => {
      console.log("peer connection closed");
      this.setState({
        peerConnection: false,
      });
    });

    peer.signal(callerData.signal);
    this.setState({
      peerConnection: true,
    });
  }

  componentDidMount() {
    // const self = this;
    socket.on("connect", () => {
      console.log("connected to server");
      this.setState({
        socketConnection: true,
      });

      socket.emit("clienthello");

      socket.on("serverack", (data) => {
        console.log("server ack received", data);
        this.setState({
          my_sid: data,
        });
      });

      socket.on("link", (data) => {
        console.log(data);
        this.setState({ linkReceived: data });
      });

      socket.on("otp", (otp) => {
        this.setState({
          otp: otp,
        });
        console.log("otp received, waiting for receiver to pair");
      });

      socket.on("peerSocketId", (peerSocketId) => {
        console.log(
          "Pairing complete, found receiver Socket id:",
          peerSocketId
        );
        this.setState({
          peer_sid: peerSocketId,
          OTPaccepted: true,
        });

        if (this.state.initiator) {
          console.log("calling receiver");
          this.callPeer(this.state.peer_sid);
        }
      });

      socket.on("calling", (data) => {
        console.log("Call received");
        this.acceptCall(data);
      });

      socket.on("wrongOTP", () => {
        this.setState({
          wrongOTP: true,
        });
      });

      socket.on("peerDisconnected", () => {
        console.log("Oops, peer disconnected");
        if (this.state.peerConnection) {
          this.resetState();
        }
      });
    });
  }

  checkApi() {
    fetch("http://localhost:4000/api")
      .then((data) => {
        // console.log(data);
        return data.json();
      })
      .then((json) => {
        console.log(json);
      });
  }

  requestOTP() {
    console.log("requesting otp");
    socket.emit("OTPrequest");
  }

  resetWrongOTP() {
    this.setState({
      wrongOTP: false,
    });
  }

  pairPeers(otp) {
    console.log("attempting to pair peers");
    socket.emit("pairingRequest", otp);
    this.setState({
      otp: otp,
    });
  }

  sendLink(data) {
    // peer.send(data); //via peer
    socket.emit("link", data); //via socket
  }

  resetFile() {
    this.setState({
      file: false,
    });
  }

  selectFile(event) {
    this.setState({
      file: event.target.files[0], //arrayBuffer
    });
  }

  sendFile() {
    let self = this; //ignore linter
    if (this.state.file) {
      const self = this;
      const stream = this.state.file.stream();
      const reader = stream.getReader();

      reader.read().then((obj) => {
        handleReading(obj.done, obj.value, self);
      });

      function handleReading(done, value, self) {
        if (done) {
          peer.send(
            JSON.stringify({
              done: true,
              fileName: self.state.file.name,
            })
          );
          console.log("sent EOF chunk");
          setTimeout(() => {
            self.setState({
              file: false,
            });
          }, 3000); //time for animation
          return;
        } else {
          peer.write(value);
          // console.log(value);
          console.log("sent a chunk");
          reader.read().then((obj) => {
            handleReading(obj.done, obj.value, self);
          });
        }
      }
    }
  }

  handleReceivingData(data) {
    if (data.toString().includes("done")) {
      console.log("received EOF chunk, ready to download");
      const parsed = JSON.parse(data);
      let fileName = parsed.fileName;
      this.setState({
        gotFile: true,
        fileName: fileName,
      });
    } else {
      worker.postMessage(data); //send a chunk to the worker
    }
  }

  download() {
    this.setState({
      gotFile: false,
    });
    worker.postMessage("download");
    worker.addEventListener("message", (event) => {
      const stream = event.data.stream();
      const fileStream = streamSaver.createWriteStream(this.state.fileName);
      stream.pipeTo(fileStream);
    });
  }

  initiator(bool) {
    console.log("setting intiator = true");
    this.setState({
      initiator: bool,
    });
  }

  resetState() {
    console.log("resetting state and destroying peer connection");
    this.setState({
      peerConnection: false,
      otp: null,
      peer_sid: null,
      file: undefined,
      OTPaccepted: false,
    });
    peer = null;
    socket.emit("peerDisconnected");
    this.refreshPage();
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    return (
      <div className="outer">
        <div className="container">
          <BrowserRouter>
            <Header
              peerConnection={this.state.peerConnection}
              resetState={this.resetState}
              refreshPage={this.refreshPage}
            />{" "}
            <Switch>
              <Route exact path="/">
                <LandingPage
                  peerConnection={this.state.peerConnection}
                  refreshPage={this.refreshPage}
                />{" "}
              </Route>{" "}
              <Route
                path="/generate-otp"
                render={(props) => (
                  <div className="pairing-div">
                    <ShowOTP
                      {...props}
                      requestOTP={this.requestOTP}
                      otp={this.state.otp}
                      peerConnection={this.state.peerConnection}
                      initiator={this.initiator}
                    />{" "}
                  </div>
                )}
              />{" "}
              <Route
                path="/enter-otp"
                render={(props) => (
                  <div className="pairing-div">
                    <EnterOTP
                      {...props}
                      pairPeers={this.pairPeers}
                      peerConnection={this.state.peerConnection}
                      wrongOTP={this.state.wrongOTP}
                      resetWrongOTP={this.resetWrongOTP}
                      OTPaccepted={this.state.OTPaccepted}
                    />{" "}
                  </div>
                )}
              />{" "}
              <Route
                path="/connected"
                render={(props) => (
                  <>
                    <DataTransfer
                      {...props}
                      peerConnection={this.state.peerConnection}
                      sendLink={this.sendLink}
                      gotFile={this.state.gotFile}
                      sendFile={this.sendFile}
                      selectFile={this.selectFile}
                      download={this.download}
                      resetFile={this.resetFile}
                      file={this.state.file}
                      linkReceived={this.state.linkReceived}
                    />{" "}
                  </>
                )}
              />{" "}
            </Switch>{" "}
          </BrowserRouter>{" "}
          {/* <div className="footer"></div> */}{" "}
        </div>{" "}
        <div className="cover-image">
          <AboutInfo />
        </div>{" "}
      </div>
    );
  }
}
