# Project Context

## Type
Internal ToB sales workflow for Maple Education (sales team only).

## Core flow
1. Intake client details
2. Match eligible services/products
3. Generate quotation / invoice / contract PDFs
4. Create follow-up reminders (Google Calendar link)
5. Push contracts to NAS via webhook

## Roles
- Sales staff
- Interns (needs clear, guided UI)

## Rules
- Auth required on first screen (Google sign-in)
- Responsive for mobile + desktop
- Single-purpose internal workflow (no B2C pages)

## Notes
- GST rate: 9% in invoices
- Calendar: open a pre-filled Google Calendar event link; user chooses to add
- NAS sync: push webhook after document generation
