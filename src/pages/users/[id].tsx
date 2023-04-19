import Layout from "@/components/Layout";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

interface UserDetailProps {
  user: User;
}

interface GetStaticProps {
  params: {
    id: string;
  }
}

export default function Detail(props: UserDetailProps) {
  const { user } = props;
  return (
    <Layout pageTitle="Users Page">
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.website}</p>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const dataUsers = await res.json();
  const paths = dataUsers.map((user: User) => ({
    params: {
      id: `${user.id}`
    }
  }));
  return {
    paths,
    fallback: false, // fallback to false lebih aman ketika build apps using static props (jika url tidak ditemukan akan tetap sukses build)
  }
}

export async function getStaticProps(context: GetStaticProps) {
  const {id} = context.params;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const user = await res.json();

  return {
    props: {
      user
    }
  }
}