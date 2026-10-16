# ICE reviewer shortlist and outreach (draft, 2026-10-16)

Nothing here has been sent. David picks the reviewers, confirms the offer, and
approves each message before it goes out. Keep reviewer names, contact details and
returned worksheets under `.review/` (ignored by Git), not in this file.

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

## Where to look, in order

1. People David already knows: his own dentist's office, local practices, anyone
   from client work. Warm asks first.
2. CODA-accredited dental assisting programs in Maine and New England. Write to the
   program's public director or department address, not individual faculty.
   Program list: ADA/CODA's accredited program search.
3. r/DentalAssistant and dental assisting Facebook groups (the plan in
   `CONTENT_TAXONOMY.md`). Check each group's rules on recruiting posts first.

## Drafts

Bracketed lines need David's decision before sending.

### 1. Community post (r/DentalAssistant or a Facebook group)

**Title:** Looking for working CDAs or dental assisting instructors to check my CDA exam prep questions

I'm building a study app for DANB's CDA exam called Toothly. It isn't affiliated with DANB. The Infection Control (ICE) component ships first, and I have 70 original practice questions drafted. Nothing goes to learners until a qualified reviewer signs off, so I need people who actually work in this field to look at them.

Every question cites a public source (the CDC's 2003 dental infection control guidelines, the CDC's 2016 Summary of Infection Prevention Practices in Dental Settings, OSHA 1910.1030 Bloodborne Pathogens, OSHA 1910.1200 HazCom) and carries the exact passage that supports the answer. You'd be checking my work against the source, not writing questions.

Review is a spreadsheet. For each question you mark approve, revise, or retire, answer three yes/no checks (is the source still current, is there one best answer, does the quoted passage support the explanation), and add notes if you have any. You can do part of it and leave the rest pending. Nine questions are flagged as priority, like the ones that rest on 2003 guidance the 2016 summary doesn't restate.

I'm looking for 3 to 5 reviewers.

[OFFER: free lifetime access to Toothly (David to confirm)]
[Optional: credit reviewers by name in the app (David to confirm)]

If you're a working CDA or an instructor and you're willing, comment or message me and I'll send the spreadsheet. The waitlist for the app is at toothly.deadpixeldesign.com.

David Russell
Dead Pixel Design, Houlton, Maine

### 2. Reply to someone who responds

Hey [First name], thanks for getting back to me.

Here's how it works. Send me the best email address to reach you and I'll send the spreadsheet. It has the 70 ICE questions, each with its source and the exact quoted passage next to it. Nine are marked priority, so start there if you only have a little time. Anything you don't get to just stays pending.

For each question you mark approve, revise, or retire, answer the three yes/no checks, and leave notes where something's off.

[OFFER: free lifetime access to Toothly (David to confirm)]
[Optional: credit you by name in the app (David to confirm)]

Toothly isn't affiliated with DANB, and nothing gets published until a qualified reviewer signs off. If you've got questions first, text me anytime at 207-538-1339.

David

### 3. Email to a program director

**Subject:** Would one of your instructors review CDA exam prep questions?

Hey [First name],

Hope you're doing well. My name's David, I run a small web design company called Dead Pixel Design out of Houlton, Maine. I'm also building a study app for DANB's CDA exam called Toothly, and I'm writing to [Program name] because it's CODA-accredited and your instructors know this material from the teaching side. Toothly isn't affiliated with DANB.

The Infection Control (ICE) component ships first. I have 70 original practice questions drafted, and nothing gets published to learners until a qualified reviewer signs off. I'm looking for 3 to 5 working CDAs or dental assisting instructors to do that.

Every question cites a public source (CDC 2003 dental infection control guidelines, CDC 2016 Summary of Infection Prevention Practices in Dental Settings, OSHA 1910.1030 Bloodborne Pathogens, OSHA 1910.1200 HazCom) and carries the exact passage that supports the answer, so the reviewer verifies rather than writes. It's a spreadsheet. For each question they mark approve, revise, or retire, answer three yes/no checks (source still current, one best answer, explanation supported), and add notes. They can do part of it and leave the rest pending. Nine questions are flagged as priority, such as older 2003 guidance the 2016 summary doesn't restate.

[OFFER: free lifetime access to Toothly (David to confirm)]
[Optional: credit reviewers by name in the app (David to confirm)]

Would you be willing to pass this along to an instructor who might be interested, or point me to the right person? I'm happy to send the spreadsheet first so they can see exactly what's being asked. The app's page is toothly.deadpixeldesign.com.

Feel free to call or text me anytime. 207-538-1339.

David Russell
Dead Pixel Design
www.deadpixeldesign.com

## Sending a packet

Export a fresh packet per reviewer (`scripts/prepare-ice-review.bat`, or
`python -B scripts/ice_review.py export --out .review/<reviewer-slug>`). Workflow
and checks: `README.md` in this folder.
