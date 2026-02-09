import Layout from '../../components/Layout';
import Header from '../../components/Header';
import UnderDevelopment from '../../components/UnderDevelopment';
import { coachNavItems } from '../../constants/navigation';
import { useNavigate } from 'react-router-dom';

export default function Performance() {
  const navigate = useNavigate();

  return (
    <Layout navItems={coachNavItems}>
      <Header
        title="Desempenho"
        leftAction={
          <div onClick={() => navigate(-1)} className="flex items-center text-accent-blue cursor-pointer">
            <span className="material-symbols-outlined !text-[24px]">chevron_left</span>
            <span className="text-[17px]">Voltar</span>
          </div>
        }
      />

      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <UnderDevelopment />
      </div>
    </Layout>
  );
}
