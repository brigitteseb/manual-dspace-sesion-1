import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Layers3,
  FileText,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Trophy,
  Database,
  Settings2,
  Search,
  ShieldCheck,
  Pencil,
  Trash2,
  Sparkles,
  ClipboardCheck,
  Image as ImageIcon,
  ExternalLink,
  FormInput,
  Target,
  LibraryBig,
  KeyRound
} from "lucide-react";
import "./styles.css";

const sections = [
  { id: "inicio", title: "Inicio", icon: BookOpen },
  { id: "jerarquia", title: "Comunidades y colecciones", icon: Layers3 },
  { id: "crear", title: "Crear comunidad", icon: Settings2 },
  { id: "editar", title: "Editar comunidad", icon: Pencil },
  { id: "metadatos", title: "Metadatos y Dublin Core", icon: Database },
  { id: "formularios", title: "Formularios", icon: FormInput },
  { id: "recursos", title: "Recursos oficiales", icon: ExternalLink },
  { id: "actividad", title: "Actividad final", icon: Trophy },
];

const createImageSteps = [
  {
    title: "1. Iniciar sesión",
    text: "Entra con una cuenta que tenga permisos de administración. Si no ves el menú de administración, solicita revisión de permisos.",
    image: "/images/01-login.svg",
    alt: "Captura sugerida: ventana de inicio de sesión en DSpace"
  },
  {
    title: "2. Abrir Nuevo → Comunidad",
    text: "Desde el signo + o el menú Nuevo, selecciona la opción Comunidad para comenzar el proceso de creación.",
    image: "/images/02-nueva-comunidad.svg",
    alt: "Captura sugerida: menú Nuevo y opción Comunidad"
  },
  {
    title: "3. Elegir comunidad principal o subcomunidad",
    text: "Puedes crear una comunidad de nivel superior o buscar una comunidad padre para crear una subcomunidad dentro de ella.",
    image: "/images/03-seleccionar-padre.svg",
    alt: "Captura sugerida: selector de comunidad padre"
  },
  {
    title: "4. Completar el formulario",
    text: "Registra nombre, logotipo, texto introductorio, descripción breve, derechos de autor y noticias. El nombre suele ser el único campo obligatorio.",
    image: "/images/04-formulario-comunidad.svg",
    alt: "Captura sugerida: formulario de creación de comunidad"
  },
  {
    title: "5. Guardar y verificar",
    text: "Al guardar, DSpace debe mostrar un mensaje de éxito y redirigir a la página de la comunidad.",
    image: "/images/05-confirmacion.svg",
    alt: "Captura sugerida: mensaje de confirmación"
  },
];

const editImageSteps = [
  {
    title: "1. Entrar a la comunidad",
    text: "Ubica la comunidad que deseas administrar. También puedes buscarla desde el menú Editar → Comunidad.",
    image: "/images/06-editar-menu.svg",
    alt: "Captura sugerida: acceso al menú de edición"
  },
  {
    title: "2. Usar el ícono de lápiz o Editar → Comunidad",
    text: "El ícono de lápiz permite abrir la edición directamente desde la página de la comunidad.",
    image: "/images/07-icono-lapiz.svg",
    alt: "Captura sugerida: botón de lápiz para editar comunidad"
  },
  {
    title: "3. Revisar las pestañas de administración",
    text: "Las pestañas agrupan acciones: metadatos, roles, curación, control de acceso y autorizaciones.",
    image: "/images/08-pestanas-edicion.svg",
    alt: "Captura sugerida: pestañas de edición de comunidad"
  },
  {
    title: "4. Revisar permisos antes de cambios críticos",
    text: "Antes de eliminar o modificar acceso, valida quién administra la comunidad y qué colecciones o ítems dependen de ella.",
    image: "/images/09-control-acceso.svg",
    alt: "Captura sugerida: control de acceso y autorizaciones"
  },
];

const editTabs = [
  {
    title: "Editar metadatos",
    icon: FileText,
    text: "Actualiza nombre, logotipo, descripción breve, texto introductorio, noticias y derechos de autor.",
  },
  {
    title: "Asignar roles",
    icon: ShieldCheck,
    text: "Designa administradores de comunidad con permisos para gestionar subcomunidades, colecciones y políticas.",
  },
  {
    title: "Curar",
    icon: Sparkles,
    text: "Ejecuta procesos de control de calidad, como revisar formatos de archivos, metadatos obligatorios o enlaces.",
  },
  {
    title: "Control de acceso",
    icon: Search,
    text: "Modifica condiciones de acceso para metadatos de ítems o archivos asociados a la comunidad.",
  },
  {
    title: "Autorizaciones",
    icon: KeyRound,
    text: "Crea, edita o elimina políticas específicas para usuarios y grupos.",
  },
  {
    title: "Eliminar comunidad",
    icon: Trash2,
    text: "Úsalo con precaución. Antes de eliminar, verifica si contiene colecciones, subcomunidades o ítems.",
  },
];

const metadataExamples = [
  ["dc.title", "Título principal del ítem"],
  ["dc.contributor.author", "Autor o autora"],
  ["dc.date.issued", "Fecha de publicación"],
  ["dc.description.abstract", "Resumen"],
  ["dc.subject", "Palabras clave"],
  ["dc.language.iso", "Idioma"],
  ["dc.type", "Tipo documental"],
  ["dc.rights", "Información de derechos"],
  ["dc.identifier.uri", "Identificador o enlace persistente"],
];

const officialLinks = [
  {
    title: "DSpace 7.x Documentation",
    text: "Página principal de documentación técnica y funcional de DSpace 7.x en la wiki de Lyrasis.",
    href: "https://wiki.lyrasis.org/display/DSDOC7x/DSpace+7.x+Documentation"
  },
  {
    title: "User Interface",
    text: "Documentación sobre la interfaz de usuario de DSpace 7.",
    href: "https://wiki.lyrasis.org/display/DSDOC7x/User+Interface"
  },
  {
    title: "Submission User Interface",
    text: "Referencia para comprender el flujo de envío o depósito de ítems.",
    href: "https://wiki.lyrasis.org/display/DSDOC7x/Submission+User+Interface"
  },
  {
    title: "Metadata and Bitstream Format Registries",
    text: "Información sobre registros de metadatos y formatos de archivos.",
    href: "https://wiki.lyrasis.org/display/DSDOC7x/Metadata+and+Bitstream+Format+Registries"
  },
  {
    title: "Configuration Reference",
    text: "Referencia general de configuración para instalaciones DSpace.",
    href: "https://wiki.lyrasis.org/display/DSDOC7x/Configuration+Reference"
  },
  {
    title: "DSpace official website",
    text: "Sitio oficial del programa DSpace.",
    href: "https://dspace.org/"
  },
  {
    title: "Proyecto LA Referencia – Lyrasis",
    text: "Iniciativa regional con documentación, capacitación y soporte para DSpace en América Latina y España.",
    href: "https://dspace.lareferencia.info/"
  },
];

const quiz = [
  {
    question: "¿En qué nivel de DSpace se depositan directamente los ítems?",
    options: ["Comunidad", "Subcomunidad", "Colección", "Página de inicio"],
    answer: "Colección",
    explanation: "Los ítems se depositan dentro de colecciones. Las comunidades y subcomunidades organizan la estructura.",
  },
  {
    question: "¿Qué contiene un ítem en DSpace?",
    options: ["Solo un archivo", "Metadatos y uno o más archivos", "Solo una descripción", "Una comunidad completa"],
    answer: "Metadatos y uno o más archivos",
    explanation: "El ítem es la unidad básica de información e incluye metadatos, archivos, licencias y condiciones de acceso.",
  },
  {
    question: "¿Cuál es una buena práctica al crear jerarquías?",
    options: ["Crear tantos niveles como sea posible", "Evitar jerarquías demasiado profundas", "Usar nombres abreviados", "Crear una comunidad por cada documento"],
    answer: "Evitar jerarquías demasiado profundas",
    explanation: "Una estructura simple facilita la navegación, la administración y la búsqueda.",
  },
  {
    question: "¿Qué campo Dublin Core se usa comúnmente para el autor?",
    options: ["dc.title", "dc.subject", "dc.contributor.author", "dc.type"],
    answer: "dc.contributor.author",
    explanation: "En DSpace, dc.contributor.author se utiliza comúnmente para registrar autoras y autores.",
  },
  {
    question: "¿Para qué sirve un formulario de depósito?",
    options: ["Para cambiar el color del sitio", "Para capturar metadatos durante el envío de un ítem", "Para borrar comunidades", "Para crear usuarios automáticamente"],
    answer: "Para capturar metadatos durante el envío de un ítem",
    explanation: "El formulario guía la captura de metadatos según la colección o el tipo documental.",
  },
];

const checklistItems = [
  "El nombre de la comunidad es claro y oficial.",
  "La estructura no tiene niveles innecesarios.",
  "La colección tiene un propósito definido.",
  "Se identificó quién administrará la comunidad o colección.",
  "Los metadatos mínimos fueron definidos.",
  "El formulario de depósito corresponde al tipo documental.",
  "Los permisos fueron revisados.",
  "La descripción breve puede ser entendida por usuarios externos.",
  "Se incluyeron enlaces de referencia para consulta posterior.",
];

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Button({ children, onClick, disabled, variant = "primary" }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`button ${variant}`}>
      {children}
    </button>
  );
}

function ProgressBar({ currentIndex }) {
  const progress = ((currentIndex + 1) / sections.length) * 100;
  return (
    <div className="progress">
      <motion.div
        className="progressFill"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function SectionButton({ section, active, onClick }) {
  const Icon = section.icon;
  return (
    <button onClick={onClick} className={`sectionButton ${active ? "active" : ""}`}>
      <Icon size={20} />
      <span>{section.title}</span>
    </button>
  );
}

function TopTrainingHeader() {
  return (
    <div className="trainingHeader">
      <div className="trainingHeaderOverlay" />
      <div className="trainingHeaderContent">
        <div>
          <p className="miniLabel">Material didáctico</p>
          <h1>Formación operativa<br />en repositorio DSpace</h1>
        </div>
        <div className="headerDecor">
          <div className="mockLaptop">
            <div className="mockScreen"></div>
            <div className="mockTrackpad"></div>
          </div>
          <div className="hexWrap">
            {Array.from({ length: 8 }).map((_, i) => <span key={i}></span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ObjectiveCard() {
  return (
    <div className="objectiveCard">
      <div className="objectiveIcon"><Target size={34} /></div>
      <div>
        <h3>Objetivo del material</h3>
        <p>
          Al finalizar este tema, la persona participante comprenderá cómo se organiza la información dentro de un repositorio DSpace, qué función cumplen las comunidades, subcomunidades, colecciones e ítems, y cómo se relacionan con los metadatos, los esquemas, los formularios de depósito y el estándar Dublin Core.
        </p>
      </div>
    </div>
  );
}

function ImageStep({ step }) {
  return (
    <Card className="imageStep">
      <div className="imageWrap">
        <img src={step.image} alt={step.alt} />
      </div>
      <div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        <p className="imageNote"><ImageIcon size={15} /> Puedes reemplazar esta imagen por una captura real del repositorio.</p>
      </div>
    </Card>
  );
}

function MetadataConcepts() {
  return (
    <div className="grid3">
      <div className="softBox concept">
        <Database />
        <h4>Metadatos</h4>
        <p>Son datos que describen un recurso. Permiten identificar, buscar, recuperar, preservar e interoperar los contenidos del repositorio.</p>
      </div>
      <div className="softBox concept">
        <LibraryBig />
        <h4>Esquemas</h4>
        <p>Son conjuntos organizados de campos. En DSpace pueden coexistir Dublin Core, DataCite, MODS u otros esquemas institucionales.</p>
      </div>
      <div className="softBox concept">
        <BookOpen />
        <h4>Dublin Core</h4>
        <p>Es el esquema más común para describir recursos digitales. En DSpace se usa con campos como dc.title, dc.subject o dc.contributor.author.</p>
      </div>
    </div>
  );
}

function QuizBlock() {
  const [answers, setAnswers] = useState({});
  const score = quiz.filter((q, idx) => answers[idx] === q.answer).length;

  return (
    <div className="stack">
      <div className="scoreBox">
        <div>
          <h3>Reto relámpago</h3>
          <p>Responde estas preguntas para comprobar comprensión.</p>
        </div>
        <div className="score">{score}/{quiz.length}<span>aciertos</span></div>
      </div>

      {quiz.map((q, idx) => {
        const selected = answers[idx];
        const isCorrect = selected === q.answer;
        return (
          <Card key={q.question}>
            <div className="question">
              <HelpCircle size={20} />
              <h4>{q.question}</h4>
            </div>
            <div className="options">
              {q.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswers({ ...answers, [idx]: option })}
                  className={`option ${selected === option ? (option === q.answer ? "correct" : "wrong") : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selected && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`feedback ${isCorrect ? "good" : "review"}`}>
                <strong>{isCorrect ? "Correcto." : "Revisa este punto."}</strong> {q.explanation}
              </motion.div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function Checklist() {
  const [checked, setChecked] = useState({});
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <Card>
      <div className="checkHeader">
        <div>
          <h3>Checklist antes de crear estructura</h3>
          <p>Úsalo como control de calidad institucional.</p>
        </div>
        <div className="score small">{done}/{checklistItems.length}<span>completo</span></div>
      </div>
      <div className="checks">
        {checklistItems.map((item, idx) => (
          <label key={item} className="checkItem">
            <input type="checkbox" checked={!!checked[idx]} onChange={() => setChecked({ ...checked, [idx]: !checked[idx] })} />
            <span className={checked[idx] ? "done" : ""}>{item}</span>
          </label>
        ))}
      </div>
    </Card>
  );
}

function App() {
  const [active, setActive] = useState("inicio");
  const currentIndex = sections.findIndex((s) => s.id === active);
  const current = sections[currentIndex];
  const CurrentIcon = current.icon;

  const titles = {
    inicio: "Manual 1. Comunidades, subcomunidades y colecciones; introducción a metadatos, esquemas y formularios.",
    jerarquia: "1. Establecimiento de una organización jerárquica.",
    crear: "2. Proceso ilustrado: crear una comunidad.",
    editar: "3. Proceso ilustrado: editar una comunidad.",
    metadatos: "4. Introducción a metadatos, esquemas y Dublin Core.",
    formularios: "5. Formularios en el repositorio.",
    recursos: "6. Recursos oficiales y documentación de apoyo.",
    actividad: "7. Actividad de cierre.",
  };

  const subtitles = {
    inicio: "Introducción a metadatos, esquemas, formularios y Dublin Core",
    jerarquia: "La navegación y organización en DSpace sigue una jerarquía.",
    crear: "Pasos guiados para crear una comunidad o subcomunidad.",
    editar: "Acciones y pestañas clave para administrar una comunidad.",
    metadatos: "Conceptos fundamentales para describir y recuperar información.",
    formularios: "Cómo se capturan los metadatos durante el depósito.",
    recursos: "Enlaces útiles para profundizar después de la sesión.",
    actividad: "Consolida lo aprendido con un ejercicio y autoevaluación.",
  };

  const nextSection = () => setActive(sections[Math.min(currentIndex + 1, sections.length - 1)].id);
  const previousSection = () => setActive(sections[Math.max(currentIndex - 1, 0)].id);

  return (
    <div className="page">
      <div className="layout">
        <aside className="sidebar">
          <Card>
            <div className="badge"><Sparkles size={14} /> DSpace 7</div>
            <h2 className="sidebarTitle">Navegación del manual</h2>
            <p className="muted">Material de refuerzo para capacitación.</p>
            <ProgressBar currentIndex={currentIndex} />
            <nav>
              {sections.map((section) => (
                <SectionButton key={section.id} section={section} active={active === section.id} onClick={() => setActive(section.id)} />
              ))}
            </nav>
          </Card>
        </aside>

        <main className="main">
          <TopTrainingHeader />

          <motion.div key={active + "header"} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="sectionHero">
            <div className="sectionHeroIcon"><CurrentIcon size={30} /></div>
            <div>
              <h2>{titles[active]}</h2>
              <p>{subtitles[active]}</p>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {active === "inicio" && (
              <motion.section key="inicio" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="stack">
                <ObjectiveCard />
                <Card>
                  <h3>¿Qué revisaremos durante este manual?</h3>
                  <p>
                    Este material se organiza en bloques breves para reforzar lo visto durante la capacitación:
                    estructura jerárquica del repositorio, creación y edición de comunidades, metadatos,
                    esquemas, Dublin Core y formularios de depósito.
                  </p>
                  <div className="pillGrid">
                    {["Organizar", "Depositar", "Describir", "Configurar"].map((word) => <div key={word}>{word}</div>)}
                  </div>
                </Card>
              </motion.section>
            )}

            {active === "jerarquia" && (
              <motion.section key="jerarquia" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="stack">
                <Card>
                  <p className="introLine">La navegación y organización en DSpace sigue una jerarquía:</p>
                  <div className="fullIllustration">
                    <img src="/images/jerarquia-guia.png" alt="Esquema visual de comunidad, subcomunidad, colección e ítem" />
                  </div>
                  <ul className="bulletList">
                    <li><strong>Comunidad:</strong> es el primer nivel visible en un repositorio y representa unidades organizativas como facultades, institutos o departamentos. Contiene subcomunidades y colecciones.</li>
                    <li><strong>Subcomunidad:</strong> es un nivel opcional que organiza mejor el repositorio dentro de una comunidad. Ejemplo: Facultad de Ciencias Sociales y su Departamento de Sociología.</li>
                    <li><strong>Colección:</strong> es el espacio donde se depositan ítems, como documentos y archivos. Ejemplos: artículos científicos, tesis o material audiovisual.</li>
                    <li><strong>Ítem:</strong> es la unidad básica de información, compuesta por metadatos, archivos y condiciones de acceso. Puede incluir PDF, imágenes, videos y más.</li>
                  </ul>
                </Card>
                <div className="callout green bigCallout">
                  <strong>Buena práctica</strong>
                  <p>Una buena estructura en DSpace debe ser clara, comprensible y fácil de navegar. Evita crear jerarquías demasiado profundas que dificulten la navegación del usuario. Prioriza estructuras claras y orientadas a la búsqueda.</p>
                </div>
              </motion.section>
            )}

            {active === "crear" && (
              <motion.section key="crear" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="stack">
                {createImageSteps.map((step) => <ImageStep key={step.title} step={step} />)}
              </motion.section>
            )}

            {active === "editar" && (
              <motion.section key="editar" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="stack">
                <div className="grid2">
                  {editTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <Card key={tab.title}>
                        <div className="miniIcon"><Icon size={24} /></div>
                        <h3>{tab.title}</h3>
                        <p>{tab.text}</p>
                      </Card>
                    );
                  })}
                </div>
                {editImageSteps.map((step) => <ImageStep key={step.title} step={step} />)}
              </motion.section>
            )}

            {active === "metadatos" && (
              <motion.section key="metadatos" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <Card>
                  <h3>Metadatos: datos que describen recursos</h3>
                  <p>
                    Los metadatos son información estructurada que permite identificar, describir, recuperar, administrar,
                    preservar e intercambiar recursos dentro y fuera del repositorio.
                  </p>
                  <MetadataConcepts />
                  <div className="callout blue">
                    <strong>¿Por qué importan?</strong>
                    <p>Un archivo sin buenos metadatos puede estar depositado, pero será más difícil de encontrar, citar, interoperar o reutilizar.</p>
                  </div>
                  <h3 className="spaced">Campos Dublin Core frecuentes</h3>
                  <table>
                    <thead><tr><th>Campo</th><th>Uso</th></tr></thead>
                    <tbody>
                      {metadataExamples.map(([field, use]) => <tr key={field}><td><code>{field}</code></td><td>{use}</td></tr>)}
                    </tbody>
                  </table>
                  <div className="grid2">
                    <div className="softBox">
                      <h4>Esquema simple</h4>
                      <p>Usa elementos generales para describir recursos, por ejemplo título, autor, fecha o materia.</p>
                    </div>
                    <div className="softBox">
                      <h4>Esquema calificado</h4>
                      <p>Añade precisión mediante calificadores, por ejemplo dc.contributor.author o dc.description.abstract.</p>
                    </div>
                  </div>
                </Card>
              </motion.section>
            )}

            {active === "formularios" && (
              <motion.section key="formularios" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <Card>
                  <h3>¿Qué son los formularios de depósito?</h3>
                  <p>
                    Los formularios son las pantallas mediante las cuales las personas capturan metadatos al depositar un ítem.
                    En una configuración institucional, pueden adaptarse por colección, tipo documental o necesidades descriptivas.
                  </p>
                  <div className="grid3">
                    <div className="softBox">
                      <h4>Tesis</h4>
                      <p>Autor, título, director, programa académico, fecha de defensa, resumen, palabras clave.</p>
                    </div>
                    <div className="softBox">
                      <h4>Artículo</h4>
                      <p>Autor, título, revista, DOI, fecha de publicación, volumen, número, páginas, resumen.</p>
                    </div>
                    <div className="softBox">
                      <h4>Datos de investigación</h4>
                      <p>Autor, título, descripción, metodología, cobertura temporal, licencia, identificador.</p>
                    </div>
                  </div>
                  <div className="callout amber">
                    <strong>Relación clave</strong>
                    <p>Colección → Formulario de depósito → Campos de metadatos → Ítem descrito.</p>
                  </div>
                  <h3 className="spaced">Buenas prácticas para formularios</h3>
                  <ul className="bulletList">
                    <li>Define campos obligatorios mínimos y evita formularios excesivamente largos.</li>
                    <li>Usa vocabularios controlados cuando sea posible.</li>
                    <li>Separa campos descriptivos, administrativos, técnicos y de derechos.</li>
                    <li>Adapta el formulario al tipo documental de la colección.</li>
                    <li>Documenta reglas de captura para autores, fechas, títulos e identificadores.</li>
                  </ul>
                </Card>
              </motion.section>
            )}

            {active === "recursos" && (
              <motion.section key="recursos" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <Card>
                  <h3>Enlaces de consulta para reforzar la sesión</h3>
                  <p>Usa estos enlaces como referencias de apoyo para administradores, bibliotecarios y equipos técnicos.</p>
                  <div className="linkGrid">
                    {officialLinks.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="resourceLink">
                        <div>
                          <strong>{link.title}</strong>
                          <p>{link.text}</p>
                        </div>
                        <ExternalLink size={18} />
                      </a>
                    ))}
                  </div>
                </Card>
              </motion.section>
            )}

            {active === "actividad" && (
              <motion.section key="actividad" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="stack">
                <Card>
                  <div className="activityTitle">
                    <ClipboardCheck size={34} />
                    <div>
                      <h3>Actividad práctica</h3>
                      <p>Diseña una estructura básica de repositorio para una institución ficticia.</p>
                    </div>
                  </div>
                  <div className="grid3">
                    <div className="softBox"><strong>1. Estructura</strong><p>Propón 2 comunidades principales y, si es necesario, una subcomunidad.</p></div>
                    <div className="softBox"><strong>2. Colecciones</strong><p>Define 2 colecciones por comunidad.</p></div>
                    <div className="softBox"><strong>3. Metadatos</strong><p>Selecciona 3 campos obligatorios para cada colección.</p></div>
                  </div>
                </Card>
                <QuizBlock />
                <Checklist />
              </motion.section>
            )}
          </AnimatePresence>

          <div className="navButtons">
            <Button onClick={previousSection} disabled={currentIndex === 0} variant="secondary">Anterior</Button>
            <Button onClick={nextSection} disabled={currentIndex === sections.length - 1}>Siguiente</Button>
          </div>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);