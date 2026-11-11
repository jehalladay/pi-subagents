"""The one canonical-JSON definition every Python consumer leg shares (collective-adaptation M1).

Byte-for-byte counterpart of the TypeScript `canonicalJson` for every value both languages accept: keys sorted at every
depth, no insignificant whitespace, non-ASCII kept as UTF-8. `allow_nan=False` makes NaN and both infinities raise
ValueError, matching the TypeScript refusal CANONICAL_JSON_UNSUPPORTED_VALUE; the default would render the bare literal
`NaN`, which is not JSON and which the TypeScript leg could never produce.

Finite doubles take the ECMAScript Number toString spelling that `JSON.stringify` gives them, not the Python repr:
shortest round-trip digits, no zero-padded exponent (1e-7, not 1e-07), no trailing `.0` (5, not 5.0), negative zero as 0,
and exponent form only below 1e-6 or at and above 1e21. The TypeScript spelling is the reference.
"""
from __future__ import annotations

import hashlib
import json
import re

# A JSON string literal (skipped untouched) or a number token. `json.dumps` writes a float with a `.` or an `e`; an int has
# neither and keeps its bytes.
_TOKEN = re.compile(r'"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?')


def _es_number(value: float) -> str:
    """The ECMAScript Number::toString spelling of a finite double."""
    if value == 0:
        return "0"
    sign = "-" if value < 0 else ""
    mantissa, _, exponent = repr(abs(value)).partition("e")
    whole, _, fraction = mantissa.partition(".")
    joined = whole + fraction
    digits = joined.lstrip("0")
    # value = 0.<digits> * 10**point
    point = len(whole) + (int(exponent) if exponent else 0) - (len(joined) - len(digits))
    digits = digits.rstrip("0")
    count = len(digits)
    if count <= point <= 21:
        return sign + digits + "0" * (point - count)
    if 0 < point <= 21:
        return sign + digits[:point] + "." + digits[point:]
    if -6 < point <= 0:
        return sign + "0." + "0" * -point + digits
    power = point - 1
    body = digits[0] + ("." + digits[1:] if count > 1 else "")
    return f"{sign}{body}e{'+' if power >= 0 else '-'}{abs(power)}"


def _respell(match: re.Match[str]) -> str:
    token = match.group(0)
    if token.startswith('"') or not any(mark in token for mark in ".eE"):
        return token
    return _es_number(float(token))


def canonical_json(value: object) -> str:
    text = json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False, allow_nan=False)
    return _TOKEN.sub(_respell, text)


def digest(value: object) -> str:
    return "sha256:" + hashlib.sha256(canonical_json(value).encode("utf-8")).hexdigest()
