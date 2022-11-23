import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface ItemType {
  id: number;
  name: string;
}

export const Div = ({ children }: { children: any }) => <div>{children}</div>;

export const Sortable = ({
  items,
  Component = Div,
}: {
  items: ItemType[];
  Component?: any;
}) => {
  const [state, setState] = useState<ItemType[]>(items);

  return (
    <ReactSortable className="flex flex-col" list={state} setList={setState}>
      {state.map((item) => (
        <Component key={item.id}>{item.name}</Component>
      ))}
    </ReactSortable>
  );
};
