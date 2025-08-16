import "./App.css";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import Editor from "react-simple-code-editor";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/vs2015.css";

function App() {
  const [code, setCode] = useState(
    `function hello() {
  console.log("Hello, world!");
}`
  );
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const rightSectionRef = useRef(null);

  const reviewCode = async () => {
    setLoading(true);
    setReview("🚀 Analyzing your code...");
    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-response",
        { prompt: code }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error reviewing code:", error);
      setReview("❌ Failed to get review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rightSectionRef.current) {
      rightSectionRef.current.scrollTop = 0;
    }
  }, [review]);

  return (
    <main>
      {/* Left Section */}
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.jsx, "jsx")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              color: "#ccc",
              height: "100%",
              width: "100%",
              overflow: "auto",
            }}
          />
          <button className="review" onClick={reviewCode} disabled={loading}>
            {loading ? "Reviewing..." : "Review"}
          </button>
        </div>
      </div>

      {/* Right Section */}

      <div className="right markdown-output" ref={rightSectionRef}>
        {loading ? (
          <div className="loader">
            <span className="loader-spinner"></span>
            <span className="loader-text">Reviewing your code...</span>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              p: ({ node, ...props }) => (
                <p className="markdown-paragraph" {...props} />
              ),
              code: ({ node, inline, className, children, ...props }) => (
                <code
                  className={`markdown-code ${inline ? "inline" : "block"}`}
                  {...props}
                >
                  {children}
                </code>
              ),
            }}
          >
            {review}
          </ReactMarkdown>
        )}
      </div>
    </main>
  );
}

export { App };
