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
  ClipboardCheck
} from "lucide-react";
import "./styles.css";

const sections = [
  { id: "inicio", title: "Inicio", icon: BookOpen },
  { id: "jerarquia", title: "Jerarquía DSpace", icon: Layers3 },
  { id: "crear", title: "Crear comunidad", icon: Settings2 },
  { id: "editar", title: "Editar y administrar", icon: Pencil },
  { id: "metadatos", title: "Metadatos y Dublin Core", icon: Database },
  { id: "actividad", title: "Actividad final", icon: Trophy },
];

const hierarchyCards = [
  {
    label: "Comunidad",
    description: "Primer nivel visible del repositorio. Suele representar una facultad, instituto, departamento, centro o gran área institucional.",
    example: "Ejemplo: Facultad de Ciencias Sociales",
  },
  {
    label: "Subcomunidad",
    description: "Nivel opcional que ayuda a organizar una comunidad cuando existe una estructura interna clara.",
    example: "Ejemplo: Departamento de Sociología",
  },
  {
    label: "Colección",
    description: "Nivel donde se depositan los ítems. Puede agrupar tesis, artículos, libros, datos, videos u otros tipos documentales.",
    example: "Ejemplo: Artículos científicos",
  },
  {
    label: "Ítem",
    description: "Unidad básica de información. Incluye metadatos, archivos y condiciones de acceso.",
    example: "Ejemplo: Un artículo con PDF, resumen, autores, fecha y palabras clave",
  },
];

const createSteps = [
  "Iniciar sesión con una cuenta autorizada.",
  "Ir al botón Nuevo o al signo + del menú de administración.",
  "Seleccionar Nuevo → Comunidad.",
  "Elegir si será una comunidad principal o una subcomunidad dentro de otra comunidad.",
  "Completar el formulario: nombre, descripción, texto introductorio, logotipo, noticias y derechos.",
  "Guardar y verificar el mensaje de confirmación.",
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
    icon: Settings2,
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

const quiz = [
  {
    question: "¿En qué nivel de DSpace se depositan directamente los ítems?",
    options: ["Comunidad", "Subcomunidad", "Colección", "Página de inicio"],
    answer: "Colección",
    explanation: "Los ítems se depositan dentro de colecciones. Las comunidades y subcomunidades sirven para organizar la estructura.",
  },
  {
    question: "¿Qué contiene un ítem en DSpace?",
    options: ["Solo un archivo", "Metadatos y uno o más archivos", "Solo una descripción", "Una comunidad completa"],
    answer: "Metadatos y uno o más archivos",
    explanation: "El ítem es la unidad básica de información y normalmente incluye metadatos, archivos, licencias y condiciones de acceso.",
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

function FlipCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.button onClick={() => setOpen(!open)} className="flipCard" whileHover={{ scale: 1.02 }}>
      <div className="flipHeader">
        <h3>{item.label}</h3>
        {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="muted">
            Toca para ver qué significa este nivel dentro del repositorio.
          </motion.p>
        ) : (
          <motion.div key="content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <p>{item.description}</p>
            <p className="example">{item.example}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
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
    inicio: "Manual interactivo · Sesión 1",
    jerarquia: "Comunidad → Subcomunidad → Colección → Ítem",
    crear: "Cómo crear una comunidad",
    editar: "Editar, administrar y eliminar comunidades",
    metadatos: "Metadatos, esquemas, formularios y Dublin Core",
    actividad: "Actividad de cierre",
  };

  const nextSection = () => setActive(sections[Math.min(currentIndex + 1, sections.length - 1)].id);
  const previousSection = () => setActive(sections[Math.max(currentIndex - 1, 0)].id);

  return (
    <div className="page">
      <div className="layout">
        <aside className="sidebar">
          <Card>
            <div className="badge"><Sparkles size={14} /> DSpace 7</div>
            <h1>Comunidades, colecciones y metadatos</h1>
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
          <motion.div key={active + "header"} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="hero">
            <div className="heroIcon"><CurrentIcon size={30} /></div>
            <div>
              <p>Tema 1</p>
              <h2>{titles[active]}</h2>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {active === "inicio" && (
              <motion.section key="inicio" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <Card>
                  <h3>¿Qué vamos a aprender?</h3>
                  <p>
                    En esta sesión conocerás cómo se organiza un repositorio DSpace, cómo se crean y administran comunidades,
                    y por qué los metadatos son esenciales para que los contenidos sean recuperables, comprensibles e interoperables.
                  </p>
                  <div className="pillGrid">
                    {["Organizar", "Depositar", "Describir", "Encontrar"].map((word) => <div key={word}>{word}</div>)}
                  </div>
                  <div className="callout amber">
                    <strong>Idea clave</strong>
                    <p>Una buena administración del repositorio no consiste solo en cargar archivos. Consiste en construir una arquitectura clara de información.</p>
                  </div>
                </Card>
              </motion.section>
            )}

            {active === "jerarquia" && (
              <motion.section key="jerarquia" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <Card>
                  <div className="flow">
                    <span>Comunidad</span><ChevronRight /><span>Subcomunidad</span><ChevronRight /><span>Colección</span><ChevronRight /><span>Ítem</span>
                  </div>
                  <p>Toca cada tarjeta para revisar la función de cada nivel dentro de la jerarquía.</p>
                  <div className="grid2">
                    {hierarchyCards.map((item) => <FlipCard key={item.label} item={item} />)}
                  </div>
                  <div className="callout rose">
                    <strong>Evita este error</strong>
                    <p>No crees jerarquías demasiado profundas. Una estructura muy compleja puede dificultar la navegación.</p>
                  </div>
                </Card>
              </motion.section>
            )}

            {active === "crear" && (
              <motion.section key="crear" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <Card>
                  <h3>Ruta rápida para crear una comunidad</h3>
                  <div className="steps">
                    {createSteps.map((step, idx) => (
                      <div key={step} className="step">
                        <div>{idx + 1}</div>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid2">
                    <div className="softBox"><h4>Comunidad principal</h4><p>Se crea en el primer nivel visible del repositorio.</p></div>
                    <div className="softBox"><h4>Subcomunidad</h4><p>Se crea dentro de una comunidad o subcomunidad ya existente.</p></div>
                  </div>
                </Card>
              </motion.section>
            )}

            {active === "editar" && (
              <motion.section key="editar" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
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
              </motion.section>
            )}

            {active === "metadatos" && (
              <motion.section key="metadatos" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <Card>
                  <h3>Metadatos: datos que describen datos</h3>
                  <p>Los metadatos permiten identificar, organizar, recuperar, interoperar y preservar los ítems del repositorio.</p>
                  <div className="grid3">
                    <div className="softBox"><h4>Esquema</h4><p>Conjunto organizado de campos para describir recursos.</p></div>
                    <div className="softBox"><h4>Formulario</h4><p>Interfaz donde se capturan los metadatos al depositar un ítem.</p></div>
                    <div className="softBox"><h4>Dublin Core</h4><p>Estándar ampliamente usado para describir recursos digitales.</p></div>
                  </div>
                  <table>
                    <thead><tr><th>Campo</th><th>Uso</th></tr></thead>
                    <tbody>
                      {metadataExamples.map(([field, use]) => <tr key={field}><td><code>{field}</code></td><td>{use}</td></tr>)}
                    </tbody>
                  </table>
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