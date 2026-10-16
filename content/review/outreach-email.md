# ICE reviewer outreach (draft, not sent)

Nothing here has been sent. David approves each message before it goes out.
Keep reviewer names, contact details and returned worksheets under `.review/`
(ignored by Git), not in this file. The named shortlist is
`.review/reviewer-shortlist.md`: 13 CODA-accredited programs in Maine and New
England, 8 with a published director email.

**Decided by David, 2026-10-16:** the offer is free lifetime access only (no pay,
no name credit). Round one is email to CODA-accredited program directors in Maine
and New England, leading with the cited-source angle.

## Who to pick

Target 3-5 reviewers. Instructors first, since they may bring students.

Must have:

- Currently a working CDA or a dental-assisting instructor. Ask for the credential
  (DANB certificate number can be checked on DANB's public verification page) or
  the program they teach at.
- Infection control is part of their daily work or their syllabus.
- Willing to work in a CSV worksheet and read the source quotes.

Nice to have:

- One instructor from a CODA-accredited program.
- One assistant from general practice and one from a specialty office, so the
  priority items (2003-era guidance, trap cleaning, sterilizer monitoring) get
  more than one view.
- Recent exam takers are useful for wording, but they do not count toward the
  qualified sign-off.

## Where to look

1. Round one: CODA-accredited dental assisting programs in Maine and New England.
   Write to the program director or coordinator address the school publishes.
2. Later, if round one comes up short: people David already knows (his own
   dentist's office, local practices), then r/DentalAssistant and dental assisting
   Facebook groups (the plan in `CONTENT_TAXONOMY.md`). Check each group's rules
   on recruiting posts first.

## Program director email

Subject (pick one):

1. 70 infection control questions, every one cites its source
2. Would you review practice questions for a DANB ICE prep app?

Hey {first_name}

My name's David, I'm a one-person builder in Houlton, Maine, working on Toothly, prep for DANB's ICE and CDA exams that carries on as a chairside reference. It isn't live yet.

I've drafted 70 Infection Control questions from public sources, the CDC's 2003 and 2016 dental guidance and OSHA's bloodborne pathogens and hazard communication standards. Every question quotes the exact passage it's based on, so you'd be verifying, not writing. Nobody has reviewed them yet, and they stay unpublished until a qualified reviewer signs off.

For each one you'd mark approve, revise or retire, and confirm the guidance is current, there's one best answer, and the source supports the explanation. It's an offline packet with no install or account, doable in chunks, and my rough estimate is 2 to 3 hours for all 70.

I'm looking for 3 to 5 reviewers, and you'd get free lifetime access to Toothly. Are you up for it at {program_name}? A yes or no is plenty. If not, passing this to a working CDA colleague is welcome.

Toothly isn't affiliated with or endorsed by DANB.

David Russell
Toothly (Dead Pixel Design)
Houlton, Maine
207-538-1339

## Follow-up (about 7 days later, same thread)

Hey {first_name}

Following up in case this got buried at {institution}. I'm looking for a few people to check 70 infection control questions against their CDC and OSHA sources, roughly 2 to 3 hours by my estimate, in exchange for free lifetime access to Toothly. A yes or no is all I need, and the name of a working CDA who'd be a better fit works just as well.

David Russell
Toothly (Dead Pixel Design)
Houlton, Maine
207-538-1339

## When someone says yes

Confirm their CDA credential or teaching role. Export a fresh packet per reviewer
(`scripts/prepare-ice-review.bat`, or
`python -B scripts/ice_review.py export --out .review/<reviewer-slug>`), send it,
and check the returned `feedback.csv` per `README.md` in this folder. Log each
contact in the shortlist's status table.
