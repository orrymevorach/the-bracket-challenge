import Form from '@/components/Contact/Form/Form';
import Meta from '@/components/shared/Head/Head';
import Layout from '@/components/shared/Layout/Layout';

export default function ContactPage() {
  return (
    <div>
      <Meta title="Contact Us" />
      <Layout>
        <Form />
      </Layout>
    </div>
  );
}
