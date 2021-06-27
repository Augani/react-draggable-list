import React from 'react';
import './style.css';
import { motion } from 'framer-motion';
import { usePositionReorder } from './usePositionReorder';
import { useMeasurePosition } from './useMeasurePosition';

const List = [1, 2, 3, 4, 5, 6];

export default function App() {
  const [updatedList, updatePosition, updateOrder] = usePositionReorder(List);
  return (
    <div className="container">
      {updatedList.map((n, index) => (
        <Item
          key={index}
          ind={index}
          updateOrder={updateOrder}
          updatePosition={updatePosition}
          updat
          name={n}
        />
      ))}
    </div>
  );
}

function Item({ name, updateOrder, updatePosition, ind }) {
  const [isdragged, setIsDragged] = React.useState(false);

  const itemRef = useMeasurePosition(pos => {
    updatePosition(ind, pos);
  });

  return (
    <motion.div
      style={{
        zIndex: isdragged ? 2 : 1
      }}
      dragConstraints={{
        top: 0,
        bottom: 0
      }}
      layout
      ref={itemRef}
      onDragStart={() => setIsDragged(true)}
      onDragEnd={() => setIsDragged(false)}
      animate={{
        scale: isdragged ? 1.05 : 1
      }}
      onViewportBoxUpdate={(_, delta) => {
        if (isdragged) {
          updateOrder(ind, delta.y.translate);
        }
      }}
      drag="y"
    >
      {name}
    </motion.div>
  );
}
