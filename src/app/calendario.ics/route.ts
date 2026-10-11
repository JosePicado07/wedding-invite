import { NextResponse } from 'next/server'
import { venue } from '@/data/invitation'

// Pre-rendered as a static asset at build time — this event's details never
// change per-request. Served with real Content-Type/Content-Disposition
// headers (not a `data:` URI) because iOS Safari does not reliably support
// the HTML `download` attribute on data URIs: tapping such a link there
// either does nothing or dumps raw .ics text into the page instead of
// opening the native "Add to Calendar" sheet. A real HTTP response with
// `text/calendar` works correctly across iOS, Android, and desktop.
export const dynamic = 'force-static'

// Costa Rica is UTC-6 year-round (no DST), so local times convert to a
// fixed UTC offset — no VTIMEZONE block needed for a single-event .ics.
const ICS_LINES = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Michelle & Jose Wedding//ES',
  'BEGIN:VEVENT',
  'UID:michelle-jose-wedding-2027@invitacion',
  'DTSTAMP:20261001T000000Z',
  'DTSTART:20270116T223000Z',
  'DTEND:20270117T040000Z',
  'SUMMARY:Boda de Michelle & Jose',
  `DESCRIPTION:Ceremonia y recepción en ${venue.name}, ${venue.location}.`,
  `LOCATION:${venue.name}, ${venue.location}`,
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n')

export function GET() {
  return new NextResponse(ICS_LINES, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="boda-michelle-jose.ics"',
    },
  })
}
