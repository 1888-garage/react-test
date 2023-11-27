import { useState } from 'react';
import PoenCardAm from './PoemAm';
import PoenCard from './PoemEn';

const PoemCom = ({ languge }: { languge: string }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languge);

  return (
    <>
    <div className='flex justify-center w-full mt-2'>
      <select className="border border-gray-300 rounded-md px-2 py-2" onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value={selectedLanguage} disabled>Select an Option</option>
        <option value="am">Amharic</option>
        <option value="en">English</option>
      </select>
    </div>
    {selectedLanguage == 'am' ? <PoenCardAm /> : <PoenCard />}
    </>
  );
};

export default PoemCom;