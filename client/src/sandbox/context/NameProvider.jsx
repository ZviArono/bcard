import React, { useState, useEffect, useContext } from "react";
import { node } from "prop-types";

const NameContext = React.createContext(null);

// console.log(NameContext);

// const context =  {
//   Provider:{value: "text"},
//   Consumer: this.Provider.value,
//   useName(){
//     return this.Consumer
//   }
// }

// console.log(context.useName());

export const NameProvider = ({ children }) => {
  const [name, setName] = useState();

  useEffect(() => {
    setName("Zvi");
  }, []);

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  const context = useContext(NameContext);
  if (!context) throw new Error("useName must be used within a NameProvider");
  return context;
};

NameProvider.propTypes = {
  children: node.isRequired,
};

export default NameProvider;
