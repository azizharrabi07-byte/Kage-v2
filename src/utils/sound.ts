type SoundName = 'clash' | 'zen' | 'click' | 'success' | 'error';

let AudioModule: any = null;
try {
  AudioModule = require('expo-av');
} catch {}

const cache = new Map<string, any>();

async function loadSound(name: SoundName) {
  if (!AudioModule) return null;
  try {
    const { Sound } = AudioModule;
    const sources: Record<SoundName, number> = {
      clash: require('../../assets/sounds/clash.mp3'),
      zen: require('../../assets/sounds/zen.mp3'),
      click: require('../../assets/sounds/click.mp3'),
      success: require('../../assets/sounds/success.mp3'),
      error: require('../../assets/sounds/error.mp3'),
    };
    const source = sources[name];
    if (!source) return null;
    const { sound } = await Sound.createAsync(source, { shouldPlay: true });
    return sound;
  } catch {
    return null;
  }
}

export async function playSound(name: SoundName) {
  if (!AudioModule) return;
  try {
    let sound = cache.get(name);
    if (!sound) {
      sound = await loadSound(name);
      if (!sound) return;
      cache.set(name, sound);
    } else {
      await sound.replayAsync();
    }
  } catch {}
}

export async function unloadAll() {
  for (const sound of cache.values()) {
    try { await sound.unloadAsync(); } catch {}
  }
  cache.clear();
}
