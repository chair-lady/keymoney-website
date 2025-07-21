import { useDispatch } from 'react-redux';
import { addToCart } from '../../store';

function AnimalCard({ animal }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl">{animal.type} - {animal.breed}</h3>
      <p>Age: {animal.age} years</p>
      <p>Price: ${animal.price}</p>
      <p>{animal.description}</p>
      <button
        onClick={() => dispatch(addToCart(animal))}
        className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default AnimalCard;