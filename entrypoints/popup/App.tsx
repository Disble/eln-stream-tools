import logo from '~/assets/logo-4x.png'
import './App.css'
import { useEffect, useState } from 'react';

type PageType = "chapter" | "synopsis" | "none";

type Tab = chrome.tabs.Tab;

function App() {
  const [isTextCorrectorActive, setIsTextCorrectorActive] = useState(false);
  const [pageType, setPageType] = useState<PageType>("none");

  useEffect(() => {
    const loadTextCorrectorState = async () => {
      const canBeEnabled = (await checkPageType()) === "chapter" ? await canChaperTransformTextarea() : await canSynopsisTransformTextarea();

      setIsTextCorrectorActive(!canBeEnabled);
    };
    
    loadTextCorrectorState();
    ;
  }, []);

  const onClick = async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    const isActivate = pageType === "chapter" ? await activateTextCorrectorInChapter(tab) : await activateTextCorrectorInSynopsis(tab);

    setIsTextCorrectorActive(isActivate[0].result ?? false);
  }

  const activateTextCorrectorInChapter = async (tab: Tab) => {
    return await browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        let success = false;
        document.querySelectorAll(".panel.panel-reading p[data-p-id]").forEach(p => {
          const paragraph = p as HTMLParagraphElement;

          // Eliminar el div.component-wrapper
          paragraph.removeChild(paragraph.querySelector("div.component-wrapper")!)
      
          // Crear un nuevo elemento textarea
          const textarea = document.createElement('textarea');
          
          // Copiar el contenido del p al textarea
          textarea.value = paragraph.innerText;
          
          // Copiar los atributos data-p-id del p al textarea (si los necesitas)
          textarea.setAttribute('data-p-id', paragraph.getAttribute('data-p-id')!);
      
          // Ajustar la altura inicial
          textarea.style.height = paragraph.offsetHeight + 'px';
      
          // Agregar un evento input para ajustar la altura mientras se escribe
          textarea.addEventListener('input', function() {
              this.style.height = 'auto';
              this.style.height = (this.scrollHeight) + 'px';
          });
      
          textarea.style.width = "100%";
          textarea.style.border = "none";
          textarea.style.padding = "0";
          textarea.style.paddingRight = "38px";
          textarea.style.margin = "0";
          textarea.style.marginBottom = "3px";
          textarea.style.background = "none";
          textarea.style.resize = "none";
          textarea.style.outline = "none";
          textarea.style.boxShadow = "none";
          textarea.style.overflow = "hidden";
          textarea.style.boxSizing = "border-box";
          
          
          // Reemplazar el p por el textarea
          paragraph.parentNode?.replaceChild(textarea, paragraph);

          success = true;
        });
        return success;
      }
    });
  }

  const activateTextCorrectorInSynopsis = async (tab: Tab) => {
    return await browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const description: HTMLPreElement | null = document.querySelector("pre.description-text.collapsed");
        
        if (!description) return false;

        const descriptionHeight = description.offsetHeight;
        const descriptionWidth = description.offsetWidth;

        description.removeChild(description.querySelector("div.story-copyright")!);

        const textarea = document.createElement('textarea');

        textarea.value = description.innerText;

        textarea.setAttribute('class', description.getAttribute('class')!);

        textarea.style.height = descriptionHeight + 'px';

        textarea.addEventListener('input', function() {
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
        }); 
        
        textarea.style.width = descriptionWidth + 'px';
        textarea.style.border = "none";
        textarea.style.padding = "0";
        textarea.style.margin = "0";
        textarea.style.marginTop = "12px";
        textarea.style.background = "none";
        textarea.style.color = "#121212";
        textarea.style.outline = "none";
        textarea.style.boxShadow = "none";
        textarea.style.overflow = "hidden";
        textarea.style.boxSizing = "border-box";

        description.parentNode?.replaceChild(textarea, description);

        return true;
      }
    });
  }

  const canChaperTransformTextarea = async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const result = await browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        return document.querySelectorAll(".panel.panel-reading p[data-p-id]").length > 0;
      }
    });
    return result[0].result;
  }

  const canSynopsisTransformTextarea = async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const result = await browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => { 
        const description = document.querySelector("textarea.description-text.collapsed");
        return description === null;
      }
    });
    return result[0].result;
  }

  const checkPageType = async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const pageType: PageType = tab.url?.includes("/story") ? "synopsis" : "chapter";
    setPageType(pageType);
    return pageType;
  }

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="card">
        <button onClick={onClick} className={isTextCorrectorActive ? "active" : ""}>
          {isTextCorrectorActive ? "Corrector de texto activado" : "Corrector de texto desactivado"}
        </button>
      </div>
    </>
  )
}

export default App;
