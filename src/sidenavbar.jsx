import { Link } from 'react-router-dom';

function Sidebar() {
  const categories = [
    { name: 'Mobile 📱', key: 'mobile' },
    { name: 'TV 📺', key: 'tv' },
    { name: 'Men 👨', key: 'men' },
    { name: 'Women 👩', key: 'women' },
    { name: 'Kids 🧒', key: 'kids' },
    { name: 'Sports 🏏', key: 'sports' },
    { name: 'Books 📚', key: 'books' },
  ];

  return (
    <div style={{ background: 'linear-gradient(to bottom, #43cea2, #185a9d)', width: '280px', height: '90vh', padding: '20px', color: 'white' }}>
      <h1 className="text-xl font-bold mb-6">Categories</h1>
      <ul style={{ listStyle: 'none', padding: '15px', fontSize: '20px' }}>
        {categories.map((cat) => (
          <li key={cat.key} style={{ padding: '15px 0' }}>
            <Link
              to={`/products/${cat.key}`}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
