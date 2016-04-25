Patient-Facing Medication Reconciliation
========================================

This is a mock app created by the [Regenstrief](https://www.regenstrief.org) [CBMI](https://www.regenstrief.org/centers/cbmi/) team for the [HIMSS](http://www.himss.org)-sponsored [Fast Healthcare Interoperability Resources (FHIR) Connectathon](http://indiana.himsschapter.org/Events/event.aspx?ItemNumber=47375) in Indianapolis on 23 and 24, April 2016.

The goal was to create an application that uses FHIR, pulling data from [Open Epic](https://open.epic.com) or a mock [INPC](http://www.ihie.org/indiana-network-for-patient-care) FHIR API. We chose to create a patient-facing medication reconciliation application.

[Demo](https://bmamlin.github.io/org.regenstrief.fhirmedlistweb/index.html)

[Video](https://www.youtube.com/watch?v=Z-eF0852o2g)

Context
-------
Imagine that you are at the doctor's office, sitting in the waiting room or in the exam room and waiting for your doctor.  You notice a [QR code](https://en.wikipedia.org/wiki/QR_code) on the wall and scan it with your phone. It takes you to your patient portal and allows you to review your current medications.

The app
-------
The first screen shows a list of patients. In production, this would be where the patient authenticated. In this mockup, you simply choose a patient instea of authenticating.

As the patient, you step through your medications, answering questions. Medication images, when available, are pulled from [NLM Pillbox](https://pillbox.nlm.nih.gov/developer.html) and indications are pulled from [openFDA](https://open.fda.gov/api/reference/).

When finished (or at any point) you can review your progress to see a summary.

NOTE: This repository provides a simulation. During the hackathon, we pulled data from a service we created that spoke with Open Epic and the INPC FHIR API to get the patient's medications and proxied calls to medication images and indication data.

Potential Enhancements
----------------------
* Indicate when medication data come from outside your institution.
* Allow the patient to add to the list (prescription not shown, vitamins, herbal medications, etc.)
* Let the patient save or email the final report to themselves or their provider(s).
* Send the final report back to the EHR to be incorporated within the Medication Reconciliation process.