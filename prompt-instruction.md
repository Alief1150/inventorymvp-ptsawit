You are a senior product engineer, system architect, and full-stack developer.

Your task is to create a complete, structured, and production-oriented Product Requirements Document (PRD) in Markdown format for a web-based Inventory Management MVP.

The output MUST be in clean, well-structured `.md` format with clear headings, bullet points, and sections.

---

# 🏢 PROJECT OVERVIEW

## Project Name
BPN Inventory Dashboard (PT Bumi Palma Nusantara)

## Context
This application is part of a server virtualization and security project. It will be deployed on an Ubuntu Server behind an Nginx reverse proxy and later secured using OPNsense (DMZ architecture).

The goal is to build a modern, professional, dark-mode inventory dashboard for internal company operations.

---

# 🎯 BUSINESS GOAL

Build a simple but realistic inventory system MVP that:
- Tracks inventory items
- Handles stock movement (in/out)
- Provides dashboard insights
- Is visually modern and production-ready
- Suitable for internal warehouse operations

---

# 👥 USER ROLES (FIXED)

Include these roles with permission hierarchy:

- Admin → full control
- Staff → CRUD inventory + stock movement
- Supervisor → view + reports + validation

---

# 📦 INVENTORY INPUT METHOD

System must support:
- Manual input (primary method)

Do NOT include barcode or QR scanning for MVP.

---

# 🏭 STORAGE STRUCTURE

- Single warehouse only (no multi-warehouse complexity)

---

# 🔔 ALERT SYSTEM

Low stock alerts must support:
- In-app notifications
- Email notifications

Do NOT include SMS or WhatsApp for MVP.

---

# 📊 REPORT EXPORT REQUIREMENTS

System must support exporting:
- PDF
- Excel
- CSV
- Print-friendly view

---

# 🌐 NETWORK ASSUMPTION

- System will run in an environment that is always online
- No offline-first requirement

---

# 📈 SCALE ASSUMPTION

- Total inventory items: < 500 items
- Optimize for simplicity and performance, not scale

---

# 🧰 TECH STACK (STRICT)

Use:
- Next.js (App Router)
- Tailwind CSS
- shadcn/ui
- Dark mode UI
- Nginx (reverse proxy environment)
- Prepare for future Supabase integration (not required yet)

---

# 🎯 OUTPUT REQUIREMENTS

Generate a complete PRD in Markdown with the following sections:

---

## 1. Executive Summary
- Project overview
- Key objectives
- Value proposition

---

## 2. Problem Statement
Explain:
- Current inventory problems (manual tracking, inefficiency, lack of visibility)
- Why this system is needed

---

## 3. Goals & Non-Goals

### Goals
- Clear measurable goals

### Non-Goals
- Explicitly mention what is NOT included in MVP

---

## 4. Target Users & Roles

Define:
- Admin
- Staff
- Supervisor

Include:
- Responsibilities
- Permissions

---

## 5. Core Features (MVP Scope)

### 5.1 Dashboard
- Summary cards
- Low stock alerts
- Recent activity
- Simple chart

### 5.2 Inventory Management
- List items (table)
- Search
- Filter
- Add item
- Edit item
- Delete item
- View detail

### 5.3 Stock Movement
- Stock in
- Stock out
- Validation (cannot go below zero)
- Movement history

### 5.4 Alerts
- Low stock highlighting
- Dashboard alerts
- Email trigger logic (conceptual)

### 5.5 Reports
- Export formats (PDF, Excel, CSV)
- Print view

---

## 6. Data Model (IMPORTANT)

Define TypeScript-style models:

- InventoryItem
- StockMovement
- User

Include fields like:
- itemCode
- name
- category
- quantity
- minStock
- location
- timestamps

---

## 7. User Flow

Describe flows:
- Login → Dashboard
- Add item
- Update stock
- Detect low stock
- Export report

---

## 8. Information Architecture

Define:
- Pages
- Navigation structure

Required pages:
- Dashboard
- Inventory List
- Add/Edit Item
- Item Detail
- Stock Movement
- Reports
- Settings (placeholder)

---

## 9. UI/UX Guidelines

Design direction:
- Dark mode default
- Clean enterprise dashboard
- Sidebar navigation
- Card-based layout
- Use shadcn/ui components

Mention specific components:
- Table
- Dialog
- Form
- Button
- Card
- Badge

---

## 10. Technical Architecture

Explain:
- Folder structure (Next.js App Router)
- Component structure
- State management approach (simple, MVP-friendly)
- API strategy (mock/local first)

---

## 11. Deployment Considerations

Explain:
- Ubuntu Server environment
- Nginx reverse proxy
- App running on port 3000
- Proxy via port 80
- Environment variables usage

---

## 12. Future Enhancements

Mention:
- Supabase integration
- Authentication system
- Multi-warehouse
- Barcode scanning

---

## 13. Build Plan (PHASED)

Break into phases:

- Phase 1 → Project setup + layout
- Phase 2 → Dashboard UI
- Phase 3 → Inventory CRUD
- Phase 4 → Stock movement
- Phase 5 → Reports + polish
- Phase 6 → Deployment

---

# ⚠️ IMPORTANT INSTRUCTIONS

- Keep everything MVP-focused
- Do NOT overengineer
- Make it realistic for a student project but professional
- Output MUST be in clean Markdown
- Use headings, bullet points, and structured formatting
- Make it suitable for technical presentation

---

Now generate the full PRD in Markdown.
