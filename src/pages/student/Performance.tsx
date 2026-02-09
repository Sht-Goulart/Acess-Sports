import Layout from '../../components/Layout';
import Header from '../../components/Header';
import UnderDevelopment from '../../components/UnderDevelopment';
import { studentNavItems } from '../../constants/navigation';

export default function Performance() {
  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Meu Desempenho"
        showProfile
        profileImg="https://lh3.googleusercontent.com/aida-public/AB6AXuCVvQQ_rUF9eBQ1bR6r_fnbzaABz2Gkl6-IyiFvYgf4rwSpanTC9M31ZMGyCMXphu7R2p4CaKPTXW77m9rDikMK7OcvUkG_d_I-lbGJtmdPjOmr7ouFwb_70Ggu2AvZFTdj0uJfPd9960lcjrda0CIoJ5bRxXuzfL6M0yvYLQkaXVkfP_A7moj7Pxt4UVg2rItfg6GxnROx_-bDvTc8J8E7YoSqsOgPgVoLMRt6rwRTl1Aj5OrPbn2gGqdDUGXxlMN8Tu3UEbR2_SdT"
        rightAction={
          <button className="flex items-center justify-center rounded-full h-10 w-10 bg-slate-100 text-slate-700">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        }
      />

      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <UnderDevelopment />
      </div>
    </Layout>
  );
}
