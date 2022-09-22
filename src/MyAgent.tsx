import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { WHO_AM_I } from "./graphql/queries";
import RegisterMyself from "./components/RegisterMyself";
import { useNavigate } from "react-router-dom";

export type MyAgentProps = {
  setMyAgent: React.Dispatch<React.SetStateAction<{ id: string, name: string } | undefined>>;
};

const MyAgent: React.FC<MyAgentProps> = ({ setMyAgent }) => {
  const myAgentRequest = useQuery(WHO_AM_I);
  const navigate = useNavigate();

  const onCreated = (myAgent: { id: string, name: string }) => {
    setMyAgent(myAgent);
    navigate("/logging");
  };

  useEffect(() => {
    if (
      !myAgentRequest.loading &&
      !myAgentRequest.error &&
      myAgentRequest.data
    ) {
      const myAgentId = myAgentRequest.data.myAgent.id;
      const myAgentName = myAgentRequest.data.myAgent.name;
      setMyAgent({
        id: myAgentId,
        name: myAgentName
      });
    }
  }, [
    myAgentRequest.data,
    myAgentRequest.error,
    myAgentRequest.loading,
    setMyAgent,
  ]);

  if (myAgentRequest.loading) return <div>Checking my identity...</div>;
  if (myAgentRequest.error) return <RegisterMyself onCreated={onCreated} />;

  return <></>;
};

export default MyAgent;
