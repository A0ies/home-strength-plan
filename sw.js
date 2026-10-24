const CACHE = "training-2026.10.24-2";
const SHELL = ["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "img/Bent_Over_Two-Dumbbell_Row_0.jpg", "img/Bent_Over_Two-Dumbbell_Row_1.jpg", "img/Bodyweight_Squat_0.jpg", "img/Bodyweight_Squat_1.jpg", "img/Bodyweight_Walking_Lunge_0.jpg", "img/Bodyweight_Walking_Lunge_1.jpg", "img/Butt_Lift_Bridge_0.jpg", "img/Butt_Lift_Bridge_1.jpg", "img/Crunches_0.jpg", "img/Crunches_1.jpg", "img/Dead_Bug_0.jpg", "img/Dead_Bug_1.jpg", "img/Dumbbell_Bicep_Curl_0.jpg", "img/Dumbbell_Bicep_Curl_1.jpg", "img/Dumbbell_Floor_Press_0.jpg", "img/Dumbbell_Floor_Press_1.jpg", "img/Dumbbell_Rear_Lunge_0.jpg", "img/Dumbbell_Rear_Lunge_1.jpg", "img/Dumbbell_Squat_To_A_Bench_0.jpg", "img/Dumbbell_Squat_To_A_Bench_1.jpg", "img/Farmers_Walk_0.jpg", "img/Farmers_Walk_1.jpg", "img/Incline_Push-Up_0.jpg", "img/Incline_Push-Up_1.jpg", "img/One-Arm_Dumbbell_Row_0.jpg", "img/One-Arm_Dumbbell_Row_1.jpg", "img/Pushups_0.jpg", "img/Pushups_1.jpg", "img/Single_Leg_Glute_Bridge_0.jpg", "img/Single_Leg_Glute_Bridge_1.jpg", "img/Sit_Squats_0.jpg", "img/Sit_Squats_1.jpg", "img/Standing_Dumbbell_Press_0.jpg", "img/Standing_Dumbbell_Press_1.jpg", "img/Standing_Dumbbell_Triceps_Extension_0.jpg", "img/Standing_Dumbbell_Triceps_Extension_1.jpg", "img/Step-up_with_Knee_Raise_0.jpg", "img/Step-up_with_Knee_Raise_1.jpg", "img/Stiff-Legged_Dumbbell_Deadlift_0.jpg", "img/Stiff-Legged_Dumbbell_Deadlift_1.jpg"];
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
  // The calisthenics app in /calisthenics/ has its own offline cache.
  if (url.pathname.indexOf("/calisthenics/") >= 0) return;
  // The app page: network first so updates arrive, cache when offline.
  if (url.pathname.endsWith("/version.json")) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req, { cache: "no-store" }).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return res; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Photos, icons, fonts: cache first.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
