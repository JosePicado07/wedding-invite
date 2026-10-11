import { NextResponse } from 'next/server'
import { venue } from '@/data/invitation'

// Pre-rendered as a static asset at build time — this event's details never
// change per-request. Served as a real HTTP response (not a `data:` URI)
// because iOS Safari does not reliably support the HTML `download`
// attribute on data URIs. No `Content-Disposition: attachment` either —
// that makes iOS Safari treat it as a plain file download (saved silently
// to Files / shown as a download banner) instead of opening the native
// "Add to Calendar" sheet; omitting it (or using `inline`) is what lets
// Safari recognize the `text/calendar` type and handle it natively.
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
      'Content-Disposition': 'inline; filename="boda-michelle-jose.ics"',
    },
  })
}
