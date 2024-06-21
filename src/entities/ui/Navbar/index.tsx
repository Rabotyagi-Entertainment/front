import { Typography } from 'antd'

const { Title } = Typography

export const Navbar = () => {
  // const { data } = useGetProfileQuery({})

  return (
    <div style={{ width: '100%' }}>
      <span
        style={{
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title
          style={{ lineHeight: 'normal', marginTop: 0, marginBottom: 0 }}
          level={4}
        >
          Добро пожаловать в систему стажировок
        </Title>
        {/*<span style={{ display: 'flex', gap: '1rem' }}>*/}
        {/*  {data! && data.roles.includes(RolesEnum.ADMIN) ? (*/}
        {/*    <>*/}
        {/*      <NavLink to={RouteType.ADMIN_INTERNSHIP}>{'Стажировки'}</NavLink>*/}
        {/*      <NavLink to={RouteType.ADMIN_DIARY}>{'Дневники'}</NavLink>*/}
        {/*      <NavLink to={RouteType.ADMIN_LISTS}>{'Списки'}</NavLink>*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <>*/}
        {/*      <NavLink to={RouteType.STUDENT_INTERNSHIP_PROGRESS}>{'Собеседования'}</NavLink>*/}
        {/*      <NavLink to={RouteType.STUDENT_INTERNSHIP}>{'Стажировки'}</NavLink>*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*</span>*/}
      </span>
    </div>
  )
}
