import './App.css';
import Converter from './components/Converter/Converter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Tab, Tabs } from '@mui/material';
import Graph from './components/Graph/GraphWrapper';
import { useState } from 'react';

function App() {
  const [currentTab, setCurrentTab] = useState('graph')
  return (
    <div className="App">
      <header className="App-header">
        <Box sc={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={(event) => { setCurrentTab(event.target.textContent.toLowerCase()) }}>
            <Tab label="Graph" value="graph" />
            <Tab label="Converter" value="converter"/>
          </Tabs>
        </Box>
      </header>
      <div className="Content">
        {
          currentTab === 'graph' 
            ? <Graph></Graph>
            : <Converter></Converter>
        }
      </div>
    </div>
  );
}

export default App;
