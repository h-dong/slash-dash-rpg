import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleUp,
  faChevronCircleDown
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CollapseChevron({ collapse, setCollapse }: Props) {
  const icon = collapse ? faChevronCircleDown : faChevronCircleUp;
  return (
    <FontAwesomeIcon
      icon={icon}
      size="lg"
      color="grey"
      onClick={() => setCollapse(!collapse)}
    />
  );
}
