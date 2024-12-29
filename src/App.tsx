import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
function App() {
  // const url = window.location.href;
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [summarisedContent, setSummarisedContent] = useState<string>("");
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  useEffect(() => {
    // Get current tab URL when component mounts
    const getCurrentTab = async () => {
      if (!import.meta.env.DEV) {
        try {
          const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });
          if (tab?.url) {
            setUrl(tab.url);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setUrl(
          "https://stackoverflow.com/questions/18436245/how-to-fetch-url-of-current-tab-in-my-chrome-extension-using-javascript"
        );
      }
    };

    getCurrentTab();
  }, []);

  const getResponseFromGemini = async () => {
    setLoading(true);
    setSummarisedContent("");

    try {
      const prompt = `I will provide you with a URL of a webpage. Please visit the URL, extract the main content, and generate a concise and easy-to-understand summary of the webpage in the markdown format. Focus on capturing the key points, avoid technical jargon unless necessary, and omit advertisements, navigation menus, or unrelated content. If the page contains multiple sections, summarize each section briefly. If the content is too large to summarize in one response, prioritize the most critical parts. The url: ${url}`;

      const result = await model.generateContent(prompt);
      const summary = result.response.text();
      setSummarisedContent(summary);
    } catch (error) {
      console.error("Error fetching URL or summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>SummarEase 🚀</h2>
      <p>{url}</p>
      <button
        onClick={getResponseFromGemini}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Get Summary"}
      </button>

      {loading && (
        <div style={{ marginTop: "20px", color: "#555" }}>
          <h3>Summarizing the webpage, please wait...</h3>
        </div>
      )}

      {summarisedContent && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
            maxHeight: "300px",
            maxWidth: "300px",
            overflowY: "auto",
          }}
        >
          <h2>Summary:</h2>
          <ReactMarkdown
            components={{
              h2: ({ ...props }) => (
                <h2 style={{ fontWeight: "bold", color: "white" }} {...props} />
              ),
              strong: ({ ...props }) => (
                <strong
                  style={{ fontWeight: "bold", color: "white" }}
                  {...props}
                />
              ),
            }}
          >
            {summarisedContent}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;
