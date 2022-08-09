import mixpanel, { Dict, Query } from 'mixpanel-browser';

const isProd = process.env.NODE_ENV === 'production';

// Initialize sdk
mixpanel.init('189877e253ddd0c949c558b43f71b407', {
  debug: !isProd
});

/**
 * @description A small wrapper for mixpanel sdk
 */
export const Mixpanel = {
  identify: (id: string) => {
    mixpanel.identify(id);
  },
  alias: (id: string) => {
    mixpanel.alias(id);
  },
  track: (name: string, props?: Dict) => {
    mixpanel.track(name, props);
  },
  track_links: (query: Query, name: string) => {
    mixpanel.track_links(query, name, {
      referrer: document.referrer
    });
  },
  people: {
    set: (props: Dict) => {
      mixpanel.people.set(props);
    }
  }
};
