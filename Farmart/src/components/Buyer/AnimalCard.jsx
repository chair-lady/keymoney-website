
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store';

function AnimalCard({ animal }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col">
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-bold">{animal.name}</h3>
      <p className="text-gray-600">Breed: {animal.breed}</p>
      <p className="text-gray-600">Category: {animal.category}</p>
      <p className="text-gray-600">Age: {animal.age}</p>
      <p className="text-gray-600">Price: ${animal.price}</p>
      <p className="text-gray-600">Farmer: {animal.farmer}</p>
      <p className="text-gray-600">Location: {animal.location}</p>
      <p className="text-gray-600">Rating: {animal.rating}/5</p>
      <button
        onClick={() => dispatch(addToCart(animal))}
        className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default AnimalCard;
