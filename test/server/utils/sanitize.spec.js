import { assert } from 'chai';
import sanitize from 'server/utils/sanitize';

describe('sanitize', () => {
  it('should sanitize given props', () => {
    const props = {
      title: `<script>alert('Hello')</script>`,
    };
    const sanitized = sanitize(props);
    assert.deepEqual(sanitized, {
      title: '&lt;script&gt;alert(&#39;Hello&#39;)&lt;/script&gt;',
    });
  });
});
