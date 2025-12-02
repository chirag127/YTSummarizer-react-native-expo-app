# VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App

[![Build Status](https://img.shields.io/github/actions/workflow/user/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App/ci.yml?style=flat-square)](https://github.com/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App?style=flat-square)](https://codecov.io/github/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20Native%2C%20Node.js%2C%20Gemini%20AI-blue?style=flat-square)](https://github.com/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App)
[![Lint/Format](https://img.shields.io/badge/Lint%2FFormat-Biome-important?style=flat-square)](https://github.com/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App)
[![License](https://img.shields.io/github/license/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App?color=orange&style=flat-square)](https://github.com/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App?color=yellow&style=flat-square)](https://github.com/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App)

<br/>

<p align="center">
  <a href="https://github.com/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App">
    <img src="https://img.shields.io/github/stars/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App?style=social" alt="Star on GitHub">
  </a>
</p>


## 🚀 Overview

VidSummify is an AI-powered YouTube video summarizer designed for seamless cross-platform access. It leverages cutting-edge AI to distill lengthy videos into concise, digestible text summaries, complete with an optional text-to-speech playback feature for an enhanced auditory experience. Built for accessibility and efficiency, it supports iOS, Android, and Web, backed by a robust Node.js backend and Supabase for secure user authentication and history management.


## 🏛️ Architecture

This project employs a full-stack architecture, harmonizing frontend and backend components for a unified user experience.

mermaid
graph TD
    A[User Interface (React Native/Web)] --> B(API Gateway / Express.js)
    B --> C{AI Service (Gemini API)}
    B --> D(Database / Supabase)
    D --> B
    C --> B
    B --> A

    subgraph Frontend
        A
    end

    subgraph Backend
        B
        C
        D
    end



## 📜 Table of Contents

*   [Overview](#-overview)
*   [Architecture](#-architecture)
*   [Table of Contents](#-table-of-contents)
*   [Features](#-features)
*   [Technology Stack](#-technology-stack)
*   [Getting Started](#-getting-started)
*   [Development Scripts](#-development-scripts)
*   [Core Principles](#-core-principles)
*   [🤖 AI Agent Directives](#-ai-agent-directives)


## ✨ Features

*   **AI-Powered Summarization:** Utilizes Gemini AI to generate accurate and concise video summaries.
*   **Cross-Platform Support:** Native applications for iOS and Android via React Native, alongside a progressive web app (PWA).
*   **Text-to-Speech:** Integrated audio playback for summaries.
*   **Secure Authentication:** User accounts managed via Supabase for secure access.
*   **History Tracking:** Saves past summarization requests and results.
*   **Progressive Web App (PWA):** Offers an app-like experience directly in the browser.


## 🛠️ Technology Stack

*   **Frontend:** React Native, Expo, React Native Web (for PWA)
*   **Backend:** Node.js, Express.js
*   **AI:** Google Gemini API
*   **Database:** Supabase
*   **Linting/Formatting:** Biome
*   **State Management:** Context API / Zustand (or similar)
*   **Styling:** Tailwind CSS (or platform-specific solutions)


## 🚀 Getting Started

### Prerequisites

*   Node.js (v20+ recommended)
*   npm or Yarn
*   Expo CLI (`npm install -g expo-cli`)
*   Supabase Account and Project Setup
*   Google Cloud Account and Gemini API Key

### Installation

1.  **Clone the Repository:**
    bash
    git clone https://github.com/chirag127/VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App.git
    cd VidSummify-AI-YouTube-Video-Summarizer-Mobile-And-Web-App
    

2.  **Install Backend Dependencies:**
    bash
    cd backend
    npm install
    # Configure environment variables (SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY)
    cp .env.example .env
    # Edit .env file
    

3.  **Install Frontend Dependencies:**
    bash
    cd ../frontend
    npm install
    # Configure environment variables (SUPABASE_URL, SUPABASE_KEY)
    cp .env.example .env
    # Edit .env file
    

### Running the Application

1.  **Start the Backend Server:**
    bash
    cd backend
    npm start
    

2.  **Start the Frontend (Expo):**
    bash
    cd ../frontend
    npx expo start
    

    *   Follow the on-screen instructions to run on an emulator, physical device, or web browser.


## 📜 Development Scripts

| Script        | Description                                    |
| :------------ | :--------------------------------------------- |
| `dev:backend` | Starts the backend development server.         |
| `dev:frontend`| Starts the frontend development server (Expo). |
| `lint`        | Runs Biome linter across the project.          |
| `format`      | Formats code using Biome.                      |
| `test`        | Runs all project tests.                        |

*Note: Specific scripts may reside in `backend/package.json` and `frontend/package.json`.*


## 💡 Core Principles

We adhere to industry-standard software development principles to ensure maintainability, scalability, and robustness:

*   **SOLID:** Design principles for robust and maintainable object-oriented designs.
*   **DRY (Don't Repeat Yourself):** Eliminates redundancy in code and configurations.
*   **YAGNI (You Ain't Gonna Need It):** Focuses on implementing only necessary features to avoid over-engineering.
*   **Convention over Configuration:** Prefers sensible defaults to minimize boilerplate configuration.


<details>
<summary>🤖 AI Agent Directives (December 2025 Edition)</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type (`package.json` for JavaScript/TypeScript) and apply the corresponding **Apex Toolchain**.

*   **PRIMARY SCENARIO: WEB / APP / EXTENSION (TypeScript/JavaScript)**
    *   **Stack:** This project leverages **TypeScript 6.x** (with `strict` mode enabled) and **JavaScript ES2025+**. The build tooling is **Vite 7** (with the experimental `Rolldown` bundler for maximum performance). For native desktop/mobile applications, **Tauri v2.x** is the standard. For browser extensions, **WXT (Web Extension Toolkit)** is mandated.
    *   **State Management:** **Signals** are the standardized approach for reactive state management across the stack.
    *   **UI Framework:** Flexible, but preference is given to component libraries that embrace modern JavaScript standards and performance. **Tailwind CSS v4** is the preferred utility-first CSS framework.
    *   **Linting/Formatting:** **Biome** is the standard for ultra-fast, all-in-one linting and code formatting. Strict configuration is enforced.
    *   **Testing:** **Vitest** is the standard for unit and integration testing due to its high compatibility with Vite and fast execution. **Playwright** is the standard for end-to-end (E2E) testing across browsers and native platforms.
    *   **Architecture:** **Feature-Sliced Design (FSD)** is the mandated architectural pattern for organizing frontend codebases, promoting modularity and scalability.
    *   **Deployment:** Optimized for modern platforms, including **Progressive Web Apps (PWAs)**, native applications via Tauri, and browser extensions via WXT.

*   **SECONDARY SCENARIO B: SYSTEMS / PERFORMANCE (Rust/Go) - *Not directly applicable, but relevant for potential backend microservices.***
    *   **Stack:** Rust (Cargo), Go (Modules).
    *   **Lint:** Clippy / GolangCI-Lint.
    *   **Architecture:** Hexagonal Architecture (Ports & Adapters).

*   **TERTIARY SCENARIO C: DATA / AI / SCRIPTS (Python) - *Not directly applicable, but relevant for data pipelines or model training.***
    *   **Stack:** uv (Manager), Ruff (Linter), Pytest (Test).
    *   **Architecture:** Modular Monolith or Microservices.

---

## 4. AI AGENT PERFORMANCE PROTOCOLS

*   **GENERATION ACCURACY:** All generated code, documentation, and configurations must be **syntactically correct**, **semantically sound**, and **aligned with the project's established technology stack and architectural patterns**. Avoid deprecated libraries or outdated patterns.
*   **TESTING MANDATE:** Before any code generation, simulate test execution. Ensure generated code passes simulated **Vitest** unit tests and **Playwright** E2E tests. Linting with **Biome** must pass without errors or warnings.
*   **SECURITY FIRST:** Continuously scan for and mitigate potential security vulnerabilities. Adhere to **OWASP Top 10** principles. Integrate security checks into the CI/CD pipeline.
*   **DOCUMENTATION AS CODE:** All documentation (`README.md`, `AGENTS.md`, `CONTRIBUTING.md`, etc.) must be treated as code. Changes must be version-controlled and reviewed. Ensure documentation accurately reflects the current state of the codebase.
*   **MODULARITY & REUSABILITY:** Design components and services to be modular and reusable. Adhere to the **Feature-Sliced Design (FSD)** principles for frontend code organization.
*   **PERFORMANCE OPTIMIZATION:** Leverage **Vite 7 (with Rolldown)** and **Signals** for optimal frontend performance. Optimize backend API response times and database queries.

---

## 5. CHAIN OF RESPONSIBILITY (COR) PROTOCOL

As the Apex Technical Authority, you are responsible for the entirety of the repository's structure, metadata, and code quality. You must proactively:

1.  **AUDIT:** Continuously analyze the repository for deviations from Apex standards.
2.  **REFINE:** Update dependencies, configurations, and code to align with **December 2025/2026 industry best practices**.
3.  **SECURE:** Implement robust security measures and configurations.
4.  **OPTIMIZE:** Enhance performance across all layers of the application.
5.  **AUTOMATE:** Maintain and improve CI/CD pipelines for high-velocity, zero-defect releases.

By adhering to these directives, you ensure the repository remains a benchmark of technical excellence.

</details>
