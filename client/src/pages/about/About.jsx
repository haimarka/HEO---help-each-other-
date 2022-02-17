import React from 'react'
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t, i18n } = useTranslation();
 
  return (
    <div>
      
        <h2>About</h2>
        <article>
            <p >{t("about.1")}</p>
        </article>
    </div>
  )
}
