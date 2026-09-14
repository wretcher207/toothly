# Toothly Content Taxonomy — CDA (GC + RHS + ICE)

Built 2026-08-31 from the official DANB exam outlines (downloaded to `reference/`).
Product target pivoted from COA to **CDA** (30,000+ active certificants vs ~1,000
COA holders ever). ICE and RHS also serve NELDA candidates, and ICE serves COA,
so content built here covers three certifications, not one.

## Exam facts (from the outlines)

| Exam | Questions | Minutes | Outline effective | Eligibility |
|---|---|---|---|---|
| GC — General Chairside Assisting | 95 | 75 | 07/01/2022 | CDA pathways only |
| RHS — Radiation Health and Safety | 75 | 60 | 03/12/2025 | **None — anyone can sit it** |
| ICE — Infection Control | 75 | 60 | 03/12/2025 | **None — anyone can sit it** |
| CDA bundle | 245 | 195 | — | $450, 60-day window |

- All exams are computer-adaptive (CAT); the average candidate answers ~50% correctly.
  Difficulty tiers on our questions matter — tag every question easy/medium/hard.
- RHS tests **digital radiography only** (no film since 2022-07-07). Do not draft
  film-era questions.
- ICE is shared verbatim across NELDA, CDA, and COA. RHS is shared across NELDA and CDA.

## Question bank allocation

Bank target: **600 questions** (~2.4x the real exam pool a candidate sees).
Seed target for launch: **240** (the same proportions, minimum viable mocks).
Allocation follows DANB's published domain weights exactly.

### GC — 300 target / 100 seed (weights per outline p.2)

| # | Domain | Weight | Target | Seed |
|---|---|---|---|---|
| GC-I | Evaluation | 17% | 51 | 17 |
| GC-II | Patient Management and Administration | 17% | 51 | 17 |
| GC-III | Chairside Dentistry | 50% | 150 | 50 |
| GC-IV | Dental Materials | 16% | 48 | 16 |

Subtopics (tag every question with one):
- GC-I: preliminary exam (vitals, histories, diagnostic data); head/neck/oral anatomy
  (tooth anatomy & morphology, arches, surfaces, angles, occlusion, body systems);
  charting; treatment documentation (consent, compliance); medical emergencies
  (syncope, seizures, allergic reactions, asthma/COPD, cardiac, diabetes).
- GC-II: patient management (anxiety, pediatric/special needs); oral health education
  (nutrition, fluoride, plaque control, appliances, pre/post-op instructions, caries);
  legal records; regulations (OSHA, CDC, HIPAA, standard of care, state practice acts);
  inventory; equipment maintenance (N2O tanks, rotary instruments, traps/suction);
  emergency kit.
- GC-III: four-handed dentistry (room/tray prep, seating, instrument transfer, dental
  dams, moisture control); intraoral procedures (crown & bridge, cavity prep and
  restoration, sutures, temporaries, final impressions, matrix bands, topical/local
  anesthetic); bleaching; oral surgery (implants, extractions, dry socket, N2O/O2
  analgesia, post-op complications); preventive (prophylaxis, sealants, coronal
  polishing, fluoride).
- GC-IV: impression materials (alginates, elastomerics, waxes); operative materials
  (amalgam, cements, composites, etchants, bonding agents, glass ionomers, sealants,
  liners/bases, IRM); laboratory materials (acrylics, waxes, gypsum).

### RHS — 150 target / 70 seed (weights per outline p.2)

| # | Domain | Weight | Target | Seed |
|---|---|---|---|---|
| RHS-I | Purpose and Technique | 50% | 75 | 35 |
| RHS-II | Radiation Characteristics and Protection | 25% | 38 | 18 |
| RHS-III | Infection Prevention and Control | 25% | 37 | 17 |

Subtopics:
- RHS-I: landmarks/conditions on images (caries, apical pathology, implants,
  impactions, perio, TMJ); image types (PA, bitewing, FMS, occlusal, panoramic,
  ceph, CBCT); diagnostic acceptability; acquisition technique (receptors, bite
  blocks, PIDs, paralleling vs bisecting angle); anatomical modifications (tori,
  cleft/shallow palate); error correction (exposure, placement, angulation,
  overlap, artifacts, movement); receptor care (PSP, CMOS, CCD); patient management;
  mounting and orientation (Universal numbering, radiopaque vs radiolucent);
  legal (HIPAA, retention, ownership).
- RHS-II: physics (kVp, mA, exposure time; primary vs scatter); radiation biology
  (tissue sensitivity, latent period, somatic vs genetic effects); units (Gy, Sv, R,
  rem, C/kg); protection (MPD, ALARA, barrier/position/distance, filtration,
  collimation, shielding); patient concerns and informed consent; unit malfunctions.
- RHS-III: standard precautions for radiographic equipment (barriers, clinical
  contact surfaces, critical/semi-critical/noncritical classification); hand hygiene
  and PPE during imaging; cross-contamination.

### ICE — 150 target / 70 seed (weights per outline p.2)

| # | Domain | Weight | Target | Seed |
|---|---|---|---|---|
| ICE-I | Prevention of Disease Transmission | 20% | 30 | 14 |
| ICE-II | Prevention of Cross-contamination | 34% | 51 | 24 |
| ICE-III | Process Instruments and Devices | 26% | 39 | 18 |
| ICE-IV | Occupational Safety and Administration Protocols | 20% | 30 | 14 |

Subtopics:
- ICE-I: modes of transmission; medical-history review; hand hygiene (products,
  technique, protocols); PPE (selection, donning/doffing sequence, disposal);
  aerosol/droplet/spatter control (barriers, dams, evacuation).
- ICE-II: cleaning/disinfecting treatment areas; chemical disinfectants; surface
  barriers; tray setups (SUDs, unit dosing, aseptic retrieval); dental unit
  waterlines; evacuation lines and traps; radiography equipment; impressions and
  appliances; biohazard waste disposal.
- ICE-III: instrument processing workflow (transport, chemical agents, sterilizer
  selection, packaging/labeling, loading/unloading, sterile storage); monitoring
  (BI selection, interpreting results, equipment malfunction response).
- ICE-IV: OSHA Bloodborne Pathogens Standard (engineering/work-practice controls,
  sharps safety, post-exposure protocol, records/training); OSHA Hazard
  Communication (SDS, secondary containers, first aid); CDC guidelines; EPA/FDA;
  program documentation (exposure control plan, breach handling, QA, sterilization
  logs, training records).

## Question schema (for the Supabase `questions` table)

```
id, exam (GC|RHS|ICE), domain (e.g. ICE-II), subtopic, stem, choices[4],
correct_index, explanation, source_doc, source_citation, source_quote,
difficulty (1-3), status (draft|reviewed|flagged|retired), reviewer, flag_count
```

`source_citation` is mandatory at draft time. No citation, no question.
`source_quote` is an exact span from the plain-text source copy named by
`source_doc` (`reference/sources/<source_doc>.txt`), so a reviewer checks the
key against the quote instead of hunting through the document.
`python scripts/verify_questions.py content/ice/*.json` checks schema and quotes.

## Drafting sources (public and authoritative first)

Order of drafting — least SME-dependent first:

1. **ICE** — draftable almost entirely from public government documents:
   - CDC, Guidelines for Infection Control in Dental Health-Care Settings — 2003
     (MMWR Vol. 52, RR-17): cdc.gov/mmwr/preview/mmwrhtml/rr5217a1.htm
   - CDC, Summary of Infection Prevention Practices in Dental Settings (2016)
   - OSHA 29 CFR 1910.1030 (Bloodborne Pathogens)
   - OSHA 29 CFR 1910.1200 (Hazard Communication)
2. **RHS** — physics/protection domains from public standards (ALARA, units,
   ADA/FDA imaging guidance); technique domain leans on Iannucci & Howerton,
   *Dental Radiography* 6th ed. (DANB's own reference).
3. **GC** — most textbook-dependent (Bird & Robinson, *Modern Dental Assisting*
   14th ed. is DANB's primary reference). Draft last; weight reviewer effort here.

## Review without paid contractors (decided 2026-08-31)

- Every question cites its source, so reviewers verify rather than author.
- Recruit 3-5 reviewers (working CDAs or dental-assisting instructors) from
  r/DentalAssistant and dental assisting Facebook groups; payment is free
  lifetime access. Instructors preferred — they may bring students.
- Public beta ships with a "flag this question" button; flags route to the
  `status=flagged` queue. Charge only after the flag rate settles.
- ICE ships first (public sources, zero eligibility requirement, serves NELDA +
  CDA + COA candidates simultaneously) and doubles as the free-tier funnel.

## Legal note

The taxonomy follows DANB's published exam outlines, which DANB distributes for
study use. Questions must be original — never copy DANB practice items, DALE
Foundation products, or textbook question banks. "DANB", "CDA", "RHS", "ICE",
"NELDA" are DANB trademarks: describe compatibility ("prep for DANB's CDA exam"),
never affiliation, and include a non-affiliation disclaimer in the app and store
listings.
