import React from 'react';
import InputText from '../components/InputText';
import List from '../components/List';

const style = {
  height: 300,
};

type IData = {
  item: string;
};

const Play: React.FC = () => {
  const [data, setData] = React.useState<IData[]>([]);

  const onEnter = (value: string) => {
    setData([...data, { item: value }]);
  };

  return (
    <div style={style}>
      <List data={data} empty="Yet, there is no word said." />
      <InputText onEnter={onEnter} placeholder="Enter a word and press enter." />
    </div>
  );
};

export default Play;
