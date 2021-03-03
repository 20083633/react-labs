import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Subject from './components/subject';

function App() {

  const [ subjectsState, setSubjectsState ] = useState({
    subjects: [
      { id: 1, title: "Web App Development", year: 3, lecturer: "Rosanne Birney", description: "This module approaches web application development from an apps and services perspective, as opposed to the monolithic, server-side rendering model. Services will be formulated as REST APIs (Representational State Transfer Application Program Interface), while multiple service consumer forms will be considered, including Single Page Apps (SPA) and other services. The principles and patterns underpinning the design of both components (SPA and REST API ) will be examined as well as the fine-grained aspects of the underlying communication protocol." },
      { id: 2, title: "Digital Graphic Design", year: 3, lecturer: "Sinead O' Riordan", description: "This module introduces the student to vector-based illustration software. Students will produce high-quality artwork for both screen and print, and will gain an understanding of the limitations of printing methods for various print media. This module also introduces the student to industry-standard publishing applications for interactive PDF documents, digital magazines, and EPUBs."  },
      { id: 3, title: "NoSQL Databases", year: 3, lecturer: "T.J. McDonald", description: "This module will introduce the student to the principles and practice of designing database solutions for large volumes of either structured or unstructured data. The student will gain competence in determining the suitability of a schemaless database or a data warehouse. The student will be introduced to the concepts of data persistence, consistency and distribution in the NoSQL database context. They will gain experience in the design and implementation of a NoSQL database system for unstructured data. The module will also introduce them to the use of data warehouses for storage of large volumes of structured data." }
    ],
    showSubjects: false
  });

  const [ readmoreState, setReadmoreState ] = useState({
    title: "",
    description: "",
    showDesc: false
  });

  const readMoreHandler = (subjectIndex) => {
    setReadmoreState({
      title: subjectsState.subjects[subjectIndex].title,
      description: subjectsState.subjects[subjectIndex].description,
      showDesc: true
    })
  } 

  const toggleSubjectsHandler = () => {
    const doesShow = subjectsState.showSubjects;
    setSubjectsState({
      subjects: subjectsState.subjects,
      showSubjects: !doesShow
    });
  console.log(subjectsState.showSubjects);
    if(doesShow){
      hideReadmore();
    }
  }

  const hideCardHandler = (subjectIndex) => {
    const subjects = [...subjectsState.subjects];
    subjects.splice(subjectIndex, 1);
    setSubjectsState({
      subjects: subjects,
      showSubjects: subjectsState.showSubjects
    });
  } 


  const hideReadmore = () => {
    setReadmoreState({
      title: readmoreState.title,
      description: readmoreState.description,
      showDesc: false
    });
  } 


  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
  };

  let subjects=null; 
  let ButtonText="Show Subjects";

  if (subjectsState.showSubjects) {
    subjects = (
      <div>
        {subjectsState.subjects.map((subject, index) => {
          return <Subject 
            title={subject.title}
            year={subject.year}
            lecturer={subject.lecturer}
            key={subject.id}
            hide={() => hideCardHandler(index)}
            readmore={() => readMoreHandler(index)}
          >
          Read more about this subject...
          </Subject>
        })}
      </div>
    );
    ButtonText = "Hide Subjects";
    style.backgroundColor = 'red';
  }

  let description = null;

  if (readmoreState.showDesc){
    description = (
      <div className="description">
        <h2>{readmoreState.title}</h2>
        <p>{readmoreState.description}</p>
        <span className="hide" onClick={hideReadmore}>Hide this description</span>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Hi, I'm a React App</h1>
      <button onClick={toggleSubjectsHandler} style={style}>{ButtonText}</button>
      <br />
      {subjects}
      {description}
    </div>
  );
}

export default App;