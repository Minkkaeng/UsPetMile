import { useState } from "react";
import Container from "../../components/common/Container";
import "../../styles/mypage.css";

type PetType = "DOG" | "CAT";
type PetGender = "MALE" | "FEMALE";

interface Pet {
  id: number;
  name: string;
  type: PetType;
  breed: string;
  weight: number;
  birthYear: string;
  gender: PetGender;
}

// Mock Initial Data
const INITIAL_PETS: Pet[] = [
  {
    id: 1,
    name: "구름이",
    type: "DOG",
    breed: "비숑 프리제",
    weight: 5.2,
    birthYear: "2021",
    gender: "MALE",
  },
];

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "김반려",
    email: "user@example.com",
    phone: "010-1234-5678",
  });

  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  // Form State for New/Edit Pet
  const [petForm, setPetForm] = useState<Omit<Pet, "id">>({
    name: "",
    type: "DOG",
    breed: "",
    weight: 0,
    birthYear: "",
    gender: "MALE",
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePetFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPetForm({
      ...petForm,
      [name]: name === "weight" ? parseFloat(value) : value,
    });
  };

  const openAddModal = () => {
    setEditingPet(null);
    setPetForm({
      name: "",
      type: "DOG",
      breed: "",
      weight: 0,
      birthYear: "",
      gender: "MALE",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (pet: Pet) => {
    setEditingPet(pet);
    setPetForm(pet);
    setIsModalOpen(true);
  };

  const savePet = () => {
    if (!petForm.name || !petForm.breed) {
      alert("이름과 품종을 입력해주세요.");
      return;
    }

    if (editingPet) {
      // Edit
      setPets(pets.map((p) => (p.id === editingPet.id ? { ...petForm, id: editingPet.id } : p)));
    } else {
      // Add
      const newPet = { ...petForm, id: Date.now() };
      setPets([...pets, newPet]);
    }
    setIsModalOpen(false);
  };

  const deletePet = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setPets(pets.filter((p) => p.id !== id));
    }
  };

  return (
    <section className="page bg-black min-h-screen">
      <Container className="mypage-container">
        <h1 className="section-title text-white" style={{ fontSize: "1.75rem", marginBottom: "2rem" }}>
          프로필 관리
        </h1>

        {/* User Info Section */}
        <div className="profile-section bg-[#111] p-6 rounded-lg shadow-sm border border-[#333]">
          <h2 className="text-lg font-bold mb-4 border-b border-[#333] pb-2 text-white">내 정보</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label text-gray-400">이름</label>
              <input
                type="text"
                name="name"
                className="form-input bg-[#222] border-[#333] text-white"
                value={user.name}
                onChange={handleUserChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label text-gray-400">이메일</label>
              <input
                type="email"
                name="email"
                className="form-input bg-[#222] border-[#333] text-gray-500"
                value={user.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label className="form-label text-gray-400">전화번호</label>
              <input
                type="tel"
                name="phone"
                className="form-input bg-[#222] border-[#333] text-white"
                value={user.phone}
                onChange={handleUserChange}
              />
            </div>
          </div>
          <div className="text-right mt-4">
            <button
              className="btn-primary bg-white text-black hover:bg-gray-200"
              onClick={() => alert("저장되었습니다.")}
            >
              내 정보 저장
            </button>
          </div>
        </div>

        {/* Pet Management Section */}
        <div className="profile-section bg-[#111] p-6 rounded-lg shadow-sm border border-[#333]">
          <div className="flex justify-between items-center mb-4 border-b border-[#333] pb-2">
            <h2 className="text-lg font-bold text-white">내 반려동물</h2>
            <button className="text-sm text-blue-400 font-bold hover:underline" onClick={openAddModal}>
              + 반려동물 추가
            </button>
          </div>

          <div className="pet-list">
            {pets.map((pet) => (
              <div key={pet.id} className="pet-card bg-[#222] border-[#333]">
                <div className="pet-avatar bg-[#333] text-gray-400">
                  {pet.type === "DOG" ? <i className="ph-fill ph-dog"></i> : <i className="ph-fill ph-cat"></i>}
                </div>
                <div className="pet-info">
                  <div className="pet-name text-lg text-white">
                    {pet.name}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      ({pet.gender === "MALE" ? "남아" : "여아"})
                    </span>
                  </div>
                  <div className="pet-detail text-gray-400">
                    {pet.breed} · {pet.weight}kg · {pet.birthYear}년생
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-white" onClick={() => openEditModal(pet)}>
                    <i className="ph ph-pencil-simple"></i>
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-500" onClick={() => deletePet(pet.id)}>
                    <i className="ph ph-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            {pets.length === 0 && <div className="text-center py-8 text-gray-500">등록된 반려동물이 없습니다.</div>}
          </div>
        </div>
      </Container>

      {/* Pet Modal */}
      {isModalOpen && (
        <div className="modal-overlay bg-black/80">
          <div className="modal-content bg-[#111] border border-[#333] text-white">
            <button className="close-btn text-gray-500 hover:text-white" onClick={() => setIsModalOpen(false)}>
              <i className="ph ph-x"></i>
            </button>
            <h2 className="text-xl font-bold mb-6">{editingPet ? "반려동물 수정" : "반려동물 추가"}</h2>

            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-gray-400">이름</label>
                <input
                  type="text"
                  name="name"
                  className="form-input bg-[#222] border-[#333] text-white"
                  value={petForm.name}
                  onChange={handlePetFormChange}
                  placeholder="예: 구름이"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label text-gray-400">종류</label>
                  <select
                    name="type"
                    className="form-input bg-[#222] border-[#333] text-white"
                    value={petForm.type}
                    onChange={handlePetFormChange}
                  >
                    <option value="DOG">강아지</option>
                    <option value="CAT">고양이</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label text-gray-400">성별</label>
                  <select
                    name="gender"
                    className="form-input bg-[#222] border-[#333] text-white"
                    value={petForm.gender}
                    onChange={handlePetFormChange}
                  >
                    <option value="MALE">남아</option>
                    <option value="FEMALE">여아</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label text-gray-400">품종</label>
                <input
                  type="text"
                  name="breed"
                  className="form-input bg-[#222] border-[#333] text-white"
                  value={petForm.breed}
                  onChange={handlePetFormChange}
                  placeholder="예: 비숑 프리제"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label text-gray-400">몸무게 (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    step="0.1"
                    className="form-input bg-[#222] border-[#333] text-white"
                    value={petForm.weight}
                    onChange={handlePetFormChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label text-gray-400">출생년도</label>
                  <input
                    type="number"
                    name="birthYear"
                    className="form-input bg-[#222] border-[#333] text-white"
                    value={petForm.birthYear}
                    onChange={handlePetFormChange}
                    placeholder="YYYY"
                  />
                </div>
              </div>

              <button className="btn-primary w-full mt-4 bg-white text-black hover:bg-gray-200" onClick={savePet}>
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
