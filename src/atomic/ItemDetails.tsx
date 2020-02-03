import React from "react";
import { getItemCombatStatsTextByKey } from "../utils/itemHelper";
import { ITEM } from "../database/items";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  p {
    margin: 0;
  }
`;

type Props = {
  itemKey: ITEM;
  name: string;
  quantity: number;
};

const ItemDetails = ({ itemKey, name, quantity }: Props) => {
  const itemCombatStatsText = getItemCombatStatsTextByKey(itemKey);
  return (
    <Wrapper>
      <p>
        {name} (x{quantity})
      </p>
      {itemCombatStatsText && <p>Combat Stats: {itemCombatStatsText}</p>}
    </Wrapper>
  );
};

export default ItemDetails;
