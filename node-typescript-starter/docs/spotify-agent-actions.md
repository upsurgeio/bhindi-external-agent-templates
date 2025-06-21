# Spotify Agent – Actions & cURL Examples

> All requests require an **OAuth 2.0 bearer token** in the `Authorization` header.
>
> ```bash
> -H "Authorization: Bearer ${ACCESS_TOKEN}"
> ```
>
> Replace the placeholders below (`${ACCESS_TOKEN}`, `${TRACK_ID}` …) with real values. Refer to the Spotify Web API docs for the scopes each endpoint needs.  
> <https://developer.spotify.com/documentation/web-api>

---

## 1. Search Tracks
Retrieve tracks that match a search query.

| Parameter | Example | Notes |
|-----------|---------|-------|
| query | `q=bohemian rhapsody` | URL-encoded search text |
| limit | `limit=20` | 1 – 50 (default 20) |
| offset | `offset=0` | For paging |

```bash
curl -G https://api.spotify.com/v1/search \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  --data-urlencode "q=${QUERY}" \
  --data-urlencode "type=track" \
  --data-urlencode "limit=${LIMIT}" \
  --data-urlencode "offset=${OFFSET}"
```

---

## 2. Search Artists

```bash
curl -G https://api.spotify.com/v1/search \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  --data-urlencode "q=${QUERY}" \
  --data-urlencode "type=artist" \
  --data-urlencode "limit=${LIMIT}" \
  --data-urlencode "offset=${OFFSET}"
```

---

## 3. Get Track
```bash
curl -X GET https://api.spotify.com/v1/tracks/${TRACK_ID} \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 4. Get Artist Top Tracks
```bash
curl -X GET "https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=${MARKET}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```
`market` is an ISO 3166-1 alpha-2 country code (e.g. `US`).

---

## 5. Create Playlist
Create a playlist for the current user (`me`) or any user by ID.

```bash
curl -X POST https://api.spotify.com/v1/users/${USER_ID}/playlists \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My AI Playlist",
    "description": "Created by the Spotify agent",
    "public": false
  }'
```

---

## 6. Add Tracks to Playlist

```bash
curl -X POST https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "uris": [
      "spotify:track:${TRACK_ID_1}",
      "spotify:track:${TRACK_ID_2}"
    ],
    "position": 0
  }'
```

---

## 7. Remove Tracks from Playlist

```bash
curl -X DELETE https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "tracks": [
      {"uri": "spotify:track:${TRACK_ID_1}"},
      {"uri": "spotify:track:${TRACK_ID_2}"}
    ]
  }'
```

---

## 8. Get Playlist Items

```bash
curl -X GET "https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=${LIMIT}&offset=${OFFSET}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 9. Start Playback
Play context (album/playlist) or a list of track URIs.

```bash
curl -X PUT "https://api.spotify.com/v1/me/player/play?device_id=${DEVICE_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "uris": ["spotify:track:${TRACK_ID_1}", "spotify:track:${TRACK_ID_2}"],
    "position_ms": 0
  }'
```
*Omit `uris` and send `{ "context_uri": "spotify:playlist:${PLAYLIST_ID}" }` to play an entire playlist.*

---

## 10. Pause Playback
```bash
curl -X PUT "https://api.spotify.com/v1/me/player/pause?device_id=${DEVICE_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 11. Skip to Next Track
```bash
curl -X POST "https://api.spotify.com/v1/me/player/next?device_id=${DEVICE_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 12. Skip to Previous Track
```bash
curl -X POST "https://api.spotify.com/v1/me/player/previous?device_id=${DEVICE_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 13. Get Current Playback State
```bash
curl -X GET https://api.spotify.com/v1/me/player \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 14. Get User Profile
*Current user (`me`)*
```bash
curl -X GET https://api.spotify.com/v1/me \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

*Specific user by ID*
```bash
curl -X GET https://api.spotify.com/v1/users/${USER_ID} \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 15. Get Recommendations
Generate track recommendations based on seed artists, tracks, or genres.

| Parameter | Required | Notes |
|-----------|----------|-------|
| `seed_artists` / `seed_tracks` / `seed_genres` | At least **one** (max 5 combined) | Comma-separated IDs or genre strings |
| `limit` | Optional | 1 – 100 (default 20) |
| `market` | Optional | ISO 3166-1 alpha-2 country code |

```bash
curl -G https://api.spotify.com/v1/recommendations \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  --data-urlencode "seed_tracks=${SEED_TRACK_IDS}" \
  --data-urlencode "seed_artists=${SEED_ARTIST_IDS}" \
  --data-urlencode "seed_genres=${SEED_GENRES}" \
  --data-urlencode "limit=${LIMIT}" \
  --data-urlencode "market=${MARKET}"
```

---

## 16. Get Recently Played Tracks
Returns the last 50 tracks the user listened to.

```bash
curl -X GET "https://api.spotify.com/v1/me/player/recently-played?limit=${LIMIT}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```
*Scope required: `user-read-recently-played`*

---

## 17. Get Available Devices
Lists the user's active devices (desktop, web, mobile, etc.).

```bash
curl -X GET https://api.spotify.com/v1/me/player/devices \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 18. Toggle Playback Shuffle
Enable or disable shuffle mode.

```bash
curl -X PUT "https://api.spotify.com/v1/me/player/shuffle?state=${STATE}&device_id=${DEVICE_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```
*`STATE` is `true` or `false`.*  
*Scope required: `user-modify-playback-state`*

---

## 19. Set Repeat Mode
Set repeat mode for playback.

```bash
curl -X PUT "https://api.spotify.com/v1/me/player/repeat?state=${REPEAT_STATE}&device_id=${DEVICE_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```
*`REPEAT_STATE` can be `off`, `track`, or `context`.*  
*Scope required: `user-modify-playback-state`*

---

### Useful Notes
* Many endpoints are rate-limited; inspect `Retry-After` headers for 429 responses.
* Scopes you may need: `playlist-read-private`, `playlist-modify-private`, `user-read-playback-state`, `user-modify-playback-state`, `user-read-email`, etc.
* Device-related endpoints act on the user's currently active player if `device_id` is omitted. 