import React, { memo } from 'react';

interface ListItemProps {
  text: string;
  onItemClick: (text: string) => void;
}

const ListItem = memo(({ text, onItemClick }: ListItemProps) => {
  console.log(`ListItem rendered: ${text}`);
  return (
    <li 
      className="p-2 hover:bg-gray-100 cursor-pointer rounded"
      onClick={() => onItemClick(text)}
    >
      {text}
    </li>
  );
});

ListItem.displayName = 'ListItem';

interface OptimizedListProps {
  items: string[];
  onItemClick: (text: string) => void;
}

const OptimizedList = memo(({ items, onItemClick }: OptimizedListProps) => {
  console.log('OptimizedList rendered');
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <ListItem 
          key={item} 
          text={item} 
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  );
});

OptimizedList.displayName = 'OptimizedList';

export default OptimizedList;