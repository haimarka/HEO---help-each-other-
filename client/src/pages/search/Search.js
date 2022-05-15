import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./search.css";

const Search = () => {
  const [show, setShow] = useState(false);

  const result = [
    {
      _id: "620dec605cb24d30835ffdbe",
      fullName: "Gila Ronnen",
      email: "gila@gmail.com",
      city: "lod",
      password: "$2a$12$DfuD/VbXtB8gQSk7f7QDJOpaN7tkUFlXLomBEmLAsUNQZDvv/yl12",
      phoneNumber: "+972509090890",
      occupation: ["Air conditioning technicians"],
      category: ["Other"],
      gender: "Female",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      start: "18:00",
      end: "19:40",
    },
    {
      _id: "620df12ca44896cc8b3b7e06",
      fullName: "Yakov Biton",
      email: "yakov@gmail.com",
      city: "lod",
      password: "$2a$12$llqoOLQCIGKAFiOsolWDGe0aNR1CvKOfHHVHHvEa9BWrCMpMP9eYe",
      phoneNumber: "+97251212121",
      occupation: ["Air conditioning technicians"],
      category: ["Elderly"],
      gender: "Male",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOhpV67XSI4Vz5Z_L7XoWiH7UzZQDBTzS3g&usqp=CAU",
      start: "10:30",
      end: "19:00",
    },
  ];

  const volunteersList = result.map((volunteer) => {
    return (
      <li className="resultListItem" key={volunteer?._id}>
        <div>
          <img
            src={volunteer?.img ? volunteer.img : null}
            alt="profileUserImg"
            className="resultListProfileImg"
          />
          <span>
            {volunteer.fullName}
          </span>
          <span style={{marginLeft: "30%", fontSize: "13px"}}>{volunteer.occupation}</span>
        </div>
        <hr />
      </li>
    );
  });

  return (
    <>
      <Modal show={true} fullscreen={"lg-down"} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{result.length ? volunteersList : "No result"}</Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
