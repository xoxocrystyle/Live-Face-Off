import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import { Link } from 'react-router-dom';
import '../assets/css/tokbox.css';
import axios from 'axios';
import GamePage from './gamePage';
const OT = require('@opentok/client');

class TokBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            connection: 'Connecting',
            publishVideo: true,
            apiKey: '',
            sessionId: '',
            token: '',
        };

        this.publisher = null;

        this.sessionEventHandlers = {
            sessionConnected: () => {
                this.setState({ connection: 'Connected' });
            },
            sessionDisconnected: () => {
                this.setState({ connection: 'Disconnected' });
            },
            sessionReconnected: () => {
                this.setState({ connection: 'Reconnected' });
            },
            sessionReconnecting: () => {
                this.setState({ connection: 'Reconnecting' });
            },
        };

        this.publisherEventHandlers = {
            accessDenied: () => {
                console.log('User denied access to media source');
            },
            streamCreated: () => {
                console.log('Publisher stream created');
            },
            streamDestroyed: ({ reason }) => {
                console.log(`Publisher stream destroyed because: ${reason}`);
            },
        };

        this.subscriberEventHandlers = {
            videoEnabled: () => {
                console.log('Subscriber video enabled');
            },
            videoDisabled: () => {
                console.log('Subscriber video disabled');
            },
        };
    }
    onSessionError = error => {
        this.setState({ error });
    };

    onPublish = () => {
        console.log('Publish Success');
    };

    onPublishError = error => {
        this.setState({ error });
    };

    onSubscribe = () => {
        console.log('Subscribe Success');
    };

    onSubscribeError = error => {
        this.setState({ error });
    };

    toggleVideo = () => {
        this.setState({ publishVideo: !this.state.publishVideo });
    };

    componentWillMount() {
        let sessionInfo = sessionStorage.getItem('gameSession');
        sessionInfo = JSON.parse(sessionInfo);
        this.setState({
            apiKey: sessionInfo.apiKey,
            sessionId: sessionInfo.sessionId,
            token: sessionInfo.token
        });
        console.log('sessionStorage item: ', sessionInfo);
    }

    componentWillUnmount() {
        console.log('Open Tok Unmounting');
    }


    render() {
        console.log('openTok State:', this.state);
        const { apiKey, sessionId, token, error, connection, publishVideo } = this.state;
        const vidWidth = (this.props.data === "deal52") ? { width: "23%", height: "25%" } : { width: "65%", height: "85%" };

        if (!apiKey) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div className="row col s12 fullscreen">
                {/* <div>Session Status: {connection}</div>
                {error ? (
                    <div className="error">
                        <strong>Error:</strong> {error}
                    </div>
                ) : null} */}
                <OTSession
                    apiKey={apiKey}
                    sessionId={sessionId}
                    token={token}
                    onError={this.onSessionError}
                    eventHandlers={this.sessionEventHandlers}
                >
                    {/* <button className="waves-effect waves-light btn blue-grey darken-2" id="camBtn" onClick={this.toggleVideo}>
                        {publishVideo ? 'Disable' : 'Enable'} Video

                </button> */}
                    <OTStreams>
                        <OTSubscriber
                            properties={vidWidth}
                            onSubscribe={this.onSubscribe}
                            onError={this.onSubscribeError}
                            eventHandlers={this.subscriberEventHandlers}
                        />
                    </OTStreams>
                    <OTPublisher
                        properties={{ publishVideo, width: "23%", height: "25%", }}
                        onPublish={this.onPublish}
                        onError={this.onPublishError}
                        eventHandlers={this.publisherEventHandlers}
                    />
                </OTSession>
                {/* <button className="waves-effect waves-light btn blue-grey darken-2" id="camBtn" onClick={this.toggleVideo}>
                    {publishVideo ? 'Disable' : 'Enable'} Video

                </button> */}
            </div>
        );
    }
}

export default TokBox;

 // componentDidMount() { 
    // const { camSize } = this.state;
    // console.log('CDM in progress!', OT);

    // this.publisher = OT.initPublisher('webcontainer');
    //'webcamContainer', camSize
    //  example var publisher = OT.initPublisher("publisher-element-id",
    //   {fitMode: "contain"});

    // this.getRequest();
    // }