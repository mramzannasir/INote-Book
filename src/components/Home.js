import React from "react";
import Notes from "./Notes";

export default function Home(props) {
  const {showAlert}= props
  return (
    <>
      <main className="px-1 md:px-20 lg:px-28 xl:px-40">
        <Notes  showAlert={showAlert} />
      </main>
    </>
  );
}
