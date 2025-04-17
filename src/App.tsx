import { useState } from 'react';
import './App.css';

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const MAJOR_DEGREES = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const MINOR_DEGREES = ["i", "ii°", "III", "iv", "v", "VI", "VII"];

const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10];

function getScale(root: string, isMajor: boolean) {
  const rootIndex = NOTES.indexOf(root);
  const intervals = isMajor ? MAJOR_SCALE : MINOR_SCALE;
  return intervals.map(i => NOTES[(rootIndex + i) % 12]);
}

function App() {
  const [key, setKey] = useState("C");
  const [mode, setMode] = useState<"major" | "minor">("major");

  const scale = getScale(key, mode === "major");
  const degrees = mode === "major" ? MAJOR_DEGREES : MINOR_DEGREES;

  return (
    <div className="App" style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>ダイアトニックコード ビューア</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select value={key} onChange={e => setKey(e.target.value)}>
          {NOTES.map(note => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>

        <select value={mode} onChange={e => setMode(e.target.value as "major" | "minor")}>
          <option value="major">メジャー</option>
          <option value="minor">マイナー</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>度数</th>
            <th style={{ textAlign: 'left' }}>コード</th>
          </tr>
        </thead>
        <tbody>
          {scale.map((note, i) => (
            <tr key={i}>
              <td>{degrees[i]}</td>
              <td>{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
