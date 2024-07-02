import React, { useEffect, useState } from "react";
import CardDark from "../components/template/TemplateDarkMode";
import DarkModeProvider from "../context/DarkMode";
import MainContent from "../components/layouts/MainContent";
import Navbar from "../components/layouts/Navbar";
import { useParams } from "react-router-dom";

function DetailSurah() {
  const [surahData, setSurahData] = useState(null);
  const { nomor } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await fetch(`https://equran.id/api/surat/${nomor}`);
      const data = await response.json();
      setSurahData(data);
    }
    getData();
  }, [nomor]);

  if (!surahData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 dark:border-white border-gray-900"></div>
      </div>
    );
  }

  return (
    <DarkModeProvider>
      <MainContent>
        <Navbar />
        <CardDark>
          <div className="w-4/5 block justify-between md:flex mx-auto mb-3 mt-3 bg-green-500 dark:bg-slate-900 text-white p-5 rounded-xl">
            <div>
              <h2>{surahData.nama}</h2>
              <p>
                {surahData.nama_latin} - {surahData.arti}
              </p>
            </div>
            <div>
              <audio
                src={surahData.audio}
                controls
                className="mt-3 md:mt-0"
              ></audio>
            </div>
          </div>
          {surahData.ayat.map((ayat) => (
            <div
              key={ayat.nomor}
              className="w-4/5 mx-auto mb-3 bg-green-500 py-7 px-4 dark:bg-slate-900"
            >
              <article className="text-right text-2xl font-medium text-white  arabic">
                {ayat.ar}
              </article>
              <div className="flex text-lg text-white font-medium">
                <p>{ayat.nomor}.</p>
                <p>{ayat.idn}</p>
              </div>
            </div>
          ))}
        </CardDark>
      </MainContent>
    </DarkModeProvider>
  );
}

export default DetailSurah;
