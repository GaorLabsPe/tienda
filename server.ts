import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Ensure environment variables are loaded
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Google Gen AI on server
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("WARNING: GEMINI_API_KEY is not defined or is a placeholder. Some features may run in demo/offline mode.");
      // We will fallback gracefully if key is undefined by throwing an error or handling it in route
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System instructions to customize the AI Assistant persona
const SYSTEM_INSTRUCTION = `
Eres un Consultor Experto en Puntos de Venta (POS) y Gestión Comercial para GAORSYSTEM Perú (https://gaorsystem.com). 
Tu meta es asesorar a los dueños de negocios en el diseño de su sistema ideal y convencerlos de los beneficios de GAORSYSTEM.
GAORSYSTEM es un sistema ERP completo, moderno y seguro en la nube para tiendas, minimarkets, ferreterías, boutiques y más, inspirado en la fluidez de sistemas como Odoo, pero adaptado 100% a las realidades y normativas tributarias de Perú (SUNAT, boletas y facturas electrónicas integradas).

INFORMACIÓN CLAVE DEL PRODUCTO Y CAMPAÑA DE GAORSYSTEM:
- Campaña Activa de Inicio de Mes: Ofrece un extraordinario 30% de descuento directo sobre la cotización de licenciamiento regular.
- Atributos clave:
  1. 100% Seguro: Copias de seguridad automáticas en la nube, control de accesos por cajero.
  2. En la Nube: Accede desde computadoras, laptops o tablets desde cualquier lugar del mundo.
  3. Multiusuario y Multitienda: Administra múltiples cajeros o locales sin recargos ocultos.
  4. Generación de Comprobantes SUNAT: Boletas y Facturas electrónicas en formato ticket con un solo clic.
  5. Automatización de Stock Bajo: Alertas visuales inmediatas para evitar desabastecimiento.
- Canal de contacto directo para cerrar ventas: WhatsApp 989 666 214 (contacto directo con GAORSYSTEM Perú).

INSTRUCCIONES DE RESPUESTA:
- Responde siempre en Español con un tono súper amable, profesional, dinámico y que transmita confianza y entusiasmo para impulsar al cliente a modernizar su tienda.
- Cuando te pregunten sobre un tipo de negocio específico (ej. "Tengo una bodega", "Tengo una ferretería", o "Soy una botica"), bríndales 3 consejos clave de cómo GAORSYSTEM les mejorará la vida (ej. control de lotes y fechas de vencimiento para boticas, control de tornillos/herramientas o kits para ferreterías, cobros instantáneos con lector de barras y control de mermas para minimarkets).
- Sé conciso, utiliza viñetas cuando sea apropiado para que sea muy de leer.
- Recuerda siempre mencionar e invitar a aprovechar la oferta actual del 30% de descuento por inicio de mes (con planes sumamente accesibles) y darles el enlace/número de WhatsApp +51 989 666 214 para que soliciten una demostración personalizada gratis.
`;

// API Routes
app.post("/api/consultant", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Debe proveer una lista de mensajes válida." });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      // Offline fallback mode for flawless preview even without operational API key
      const lastMessage = messages[messages.length - 1]?.text || "";
      const lower = lastMessage.toLowerCase();
      let reply = "¡Hola! Bienvenido a GAORSYSTEM Perú. Actualmente estoy en modo de demostración. ";
      
      if (lower.includes("hola") || lower.includes("buenos") || lower.includes("tarde")) {
        reply += "Permíteme contarte que GAORSYSTEM es la solución definitiva para tu tienda. Nuestro sistema cuenta con control de inventario en la nube, alertas de stock bajo y facturación electrónica SUNAT. ¡Y lo mejor es que estamos con 30% de descuento por inicio de mes de forma integral! ¿De qué rubro es tu negocio para recomendarte las mejores funciones?";
      } else if (lower.includes("bodega") || lower.includes("minimarket") || lower.includes("tienda")) {
        reply += "¡Excelente! Para un minimarket o bodega, GAORSYSTEM es ideal porque:\n\n1. **Lectura Veloz de Código de Barras**: Registra productos en milisegundos sin demoras para tus clientes.\n2. **Alertas de Stock Especiales**: Recibe notificaciones automáticas cuando te queden pocas unidades de abarrotes básicos.\n3. **Múltiples Cajeros**: Controla inicios y cierres de caja con reportes de descuadre.\n\nAprovecha nuestra campaña de inicio de mes con el 30% de descuento y facilidades flexibles. ¿Te gustaría agendar una demo gratuita hoy mismo vía WhatsApp al 989 666 214?";
      } else if (lower.includes("precio") || lower.includes("costo") || lower.includes("cuanto") || lower.includes("descuento")) {
        reply += "¡Tenemos una súper promoción activa! \n\n- **Campaña de este mes: 30% de descuento directo en tu licenciamiento anual.**\n\nNuestras tarifas son 100% personalizables según las especificaciones de tu local para darte la mayor economía posible. Te incluye almacenamiento en la nube ilimitado, soporte premium en español, multiusuarios y emisión directa de boletas electrónicas SUNAT. Puedes agendar una llamada o chat por WhatsApp al 989 666 214.";
      } else if (lower.includes("sunat") || lower.includes("boleta") || lower.includes("factura")) {
        reply += "¡Por supuesto! GAORSYSTEM está totalmente integrado con las normativas de la SUNAT. Puedes emitir boletas y facturas electrónicas directamente en formato ticket de 80mm o 58mm. Toda la información se sincroniza en la nube y se envía automáticamente para que no tengas problemas contables.";
      } else {
        reply += "Para tu negocio, GAORSYSTEM ofrece un control total y en tiempo real. Sincroniza tus ventas, organiza tus clientes, gestiona proveedores y emite comprobantes de pago de forma inmediata. Contáctanos al WhatsApp 989 666 214 para coordinar la instalación de tu sistema premium.";
      }
      return res.json({ text: reply });
    }

    const ai = getAIClient();
    
    // Convert client messages to Gemini contents structure
    // We only take the last 10 messages for safety and context
    const recentMessages = messages.slice(-10);
    const contents = recentMessages.map((msg: any) => {
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const text = response.text || "Disculpa, he tenido un problema procesando tu respuesta. ¿Podrías reescribirla?";
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ 
      error: "Error interno del asistente inteligente", 
      details: error.message 
    });
  }
});

// Configure Vite or serve build output
async function setupViteAndListen() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up Express to serve production build...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GAORSYSTEM App listening on port ${PORT}`);
    console.log(`Local environment: http://localhost:${PORT}`);
  });
}

setupViteAndListen().catch((err) => {
  console.error("Vite server initialization failed:", err);
});
