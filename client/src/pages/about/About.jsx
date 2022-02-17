import React from 'react'
import { useTranslation } from 'react-i18next';
import '../about/about.module.css'

export default function About() {
  const { t, i18n } = useTranslation();
  const handleClick = (lang)=>{
    i18n.changeLanguage(lang);
  }

  return (
    <div>
        <button onClick={()=>handleClick('en')} > english </button>
      <button onClick={()=>handleClick('il')} > עברית </button>

        <h2>About</h2>
        <article> 
            <p >{t("about.1")}</p>
        </article>
    </div>
  )
}
