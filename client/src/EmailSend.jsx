import React, { useState, useEffect, useRef } from "react";
import { startBulkEmail } from "./AppService";
const EmailSender = () => {
  const [numEmails, setNumEmails] = useState(0);
  const [emailSendNumber, setEmailSendNumber] = useState(0);
  const myDivRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    //for live reload communication
    const webUrl = "ws://localhost:3002";
    const socket = new WebSocket(webUrl);
    // inital connection..
    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    // on message received from server
    socket.onmessage = (event) => {
      let data =
        typeof event.data == "string" ? JSON.parse(event.data) : event.data;
      let _data = JSON.parse(data);
      myDivRef.current.innerHTML = `Job ID : ${_data?.jobId}`;
      emailRef.current.innerHTML = `${_data?.emailIndex}`;
      setEmailSendNumber(_data?.emailIndex);
    };

    // on socket close while memoery remove.
    return () => {
      socket.close();
    };
  }, []);

  const sendBulkEmailHandler = async () => {
    const response = await startBulkEmail(numEmails);
    const data = await response.json();
    myDivRef.current.innerHTML = `Job ID : ${data?.jobId}`;
  };

  return (
    <div className="container mt-5">
      <form>
        <div className="row mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="col-sm-2 col-form-label"
          >
            Number of Emails:
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="0"
              onChange={(e) => setNumEmails(e.target.value)}
              value={numEmails}
            />
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={sendBulkEmailHandler}
          >
            Send Bulk Email
          </button>
        </div>
      </div>

      <hr />
      <p ref={myDivRef}></p>
      {
        <div>
          Email Sent : <span ref={emailRef}>{emailSendNumber}</span>
        </div>
      }
      <hr />
    </div>
  );
};
export default EmailSender;
