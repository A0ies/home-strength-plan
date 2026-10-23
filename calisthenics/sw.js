const CACHE = "calisthenics-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "img/Back_Flyes_-_With_Bands_0.jpg", "img/Back_Flyes_-_With_Bands_1.jpg", "img/Band_Good_Morning_0.jpg", "img/Band_Good_Morning_1.jpg", "img/Band_Pull_Apart_0.jpg", "img/Band_Pull_Apart_1.jpg", "img/Bench_Dips_0.jpg", "img/Bench_Dips_1.jpg", "img/Bodyweight_Squat_0.jpg", "img/Bodyweight_Squat_1.jpg", "img/Bodyweight_Walking_Lunge_0.jpg", "img/Bodyweight_Walking_Lunge_1.jpg", "img/Butt_Lift_Bridge_0.jpg", "img/Butt_Lift_Bridge_1.jpg", "img/Decline_Push-Up_0.jpg", "img/Decline_Push-Up_1.jpg", "img/Freehand_Jump_Squat_0.jpg", "img/Freehand_Jump_Squat_1.jpg", "img/Incline_Push-Up_0.jpg", "img/Incline_Push-Up_1.jpg", "img/Inverted_Row_0.jpg", "img/Inverted_Row_1.jpg", "img/Lateral_Raise_-_With_Bands_0.jpg", "img/Lateral_Raise_-_With_Bands_1.jpg", "img/Mountain_Climbers_0.jpg", "img/Mountain_Climbers_1.jpg", "img/Plank_0.jpg", "img/Plank_1.jpg", "img/Push-Ups_-_Close_Triceps_Position_0.jpg", "img/Push-Ups_-_Close_Triceps_Position_1.jpg", "img/Pushups_0.jpg", "img/Pushups_1.jpg", "img/Reverse_Crunch_0.jpg", "img/Reverse_Crunch_1.jpg", "img/Shoulder_Press_-_With_Bands_0.jpg", "img/Shoulder_Press_-_With_Bands_1.jpg", "img/Side_Bridge_0.jpg", "img/Side_Bridge_1.jpg", "img/Single_Leg_Glute_Bridge_0.jpg", "img/Single_Leg_Glute_Bridge_1.jpg", "img/Split_Squats_0.jpg", "img/Split_Squats_1.jpg", "img/Squats_-_With_Bands_0.jpg", "img/Squats_-_With_Bands_1.jpg", "img/Superman_0.jpg", "img/Superman_1.jpg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // The app page: network first so updates arrive, cache when offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return res; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Photos, icons, fonts: cache first.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
