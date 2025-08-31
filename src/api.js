// src/api.js

const SWIGGY_BASE = 'https://www.swiggy.com';

export function buildListingUrl(lat, lng) {
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    'is-seo-homepage-enabled': 'true',
    page_type: 'DESKTOP_WEB_LISTING',
  });
  return `${SWIGGY_BASE}/dapi/restaurants/list/v5?${params.toString()}`;
}

async function safeFetchJson(url, { signal } = {}) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
      signal,
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    return res.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log(`Fetch aborted for ${url}`);
    } else {
      console.error(`Fetch error for ${url}:`, error);
    }
    throw error;
  }
}

export async function fetchRestaurants(lat, lng, signal) {
  const url = buildListingUrl(lat, lng);
  const json = await safeFetchJson(url, { signal });
  return {
    restaurants: extractRestaurants(json),
    areaTitle: extractSectionTitle(json)
  };
}

export async function fetchMenu(restaurantId, lat, lng, signal) {
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    restaurantId: String(restaurantId),
    page_type: 'DESKTOP_MENU_LISTING',
  });
  params.set('page-type', 'REGULAR_MENU');
  params.set('complete-menu', 'true');
  const url = `${SWIGGY_BASE}/dapi/menu/pl?${params.toString()}`;
  return safeFetchJson(url, { signal });
}

export function extractBannerImages(json) {
  const cards = json?.data?.cards ?? [];
  for (const c of cards) {
    const card = c?.card?.card;
    const imgs =
      card?.imageGridCards?.info ||
      card?.gridElements?.infoWithStyle?.info ||
      card?.gridElements?.infoWithStyle?.restaurants ||
      [];
    const candidates = Array.isArray(imgs) ? imgs : [];
    const imageIds = candidates
      .map((it) => it?.imageId || it?.cloudinaryImageId || it?.info?.cloudinaryImageId)
      .filter(Boolean);
    if (imageIds.length) return imageIds;
  }
  return [];
}

export function extractSectionTitle(json) {
  const cards = json?.data?.cards ?? [];
  for (const c of cards) {
    const title =
      c?.card?.card?.title ||
      c?.card?.card?.header?.title ||
      c?.card?.card?.header?.subtitle;
    if (title) return title;
  }
  return '';
}

export function extractRestaurants(json) {
  const cards = json?.data?.cards ?? [];
  for (const c of cards) {
    const card = c?.card?.card;
    const restaurants = card?.gridElements?.infoWithStyle?.restaurants;
    if (Array.isArray(restaurants) && restaurants.length) {
      return restaurants;
    }
    const altList = card?.data?.cards?.flatMap((cc) => cc?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    if (Array.isArray(altList) && altList.length) {
      return altList;
    }
  }
  return [];
}

// src/api.js

// ... (all other functions remain the same) ...

export function extractMenuItems(json) {
    const menuItems = [];
    const visited = new Set();
    const queue = [json];

    while (queue.length > 0) {
        const current = queue.shift();

        if (typeof current !== 'object' || current === null || visited.has(current)) {
            continue;
        }

        visited.add(current);

        if (current.hasOwnProperty('info') && current.info.hasOwnProperty('id')) {
            const itemData = current.info;
            if (itemData.name && (itemData.price || itemData.defaultPrice)) {
                // Found a potential menu item, now check for an imageId
                const imgId = itemData.cloudinaryImageId || itemData.imageId || itemData.dish?.info?.imageId;
                if (imgId) {
                    menuItems.push({
                        id: itemData.id,
                        name: itemData.name,
                        price: (itemData.price || itemData.defaultPrice) / 100,
                        imgId: imgId
                    });
                }
            }
        }
        
        for (const key in current) {
            if (current.hasOwnProperty(key)) {
                const value = current[key];
                if (typeof value === 'object' && value !== null) {
                    queue.push(value);
                }
            }
        }
    }
    
    // Some structures have duplicates, so filter them out
    const uniqueItems = Array.from(new Set(menuItems.map(item => item.id)))
        .map(id => menuItems.find(item => item.id === id));
    
    console.log("Extracted Menu Items:", uniqueItems);

    return uniqueItems;
}